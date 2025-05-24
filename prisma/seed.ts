import { PrismaClient, RoleName } from "./lib/generated/prisma";
import { hash } from "bcryptjs";
import { Faker, ar } from "@faker-js/faker";

// تعريب Faker
const faker = new Faker({ locale: [ar] });
const prisma = new PrismaClient();

async function main() {
  console.log("بدء عملية ملئ قاعدة البيانات...");
  // إنشاء الأدوار
  const roles = await createRoles();
  // إنشاء المستخدمين
  const users = await createUsers(roles);
  console.log("تم ملئ قاعدة البيانات بنجاح!");
}

async function createRoles() {
  const adminRole = await prisma.role.upsert({
    where: { id: "admin-role-id" },
    update: {},
    create: {
      id: "admin-role-id",
      name: RoleName.admin,
      description: "مدير النظام - لديه كافة الصلاحيات",
    },
  });
  const teacherRole = await prisma.role.upsert({
    where: { id: "teacher-role-id" },
    update: {},
    create: {
      id: "teacher-role-id",
      name: RoleName.teacher,
      description: "مدرس - يمكنه إدارة المواد والدرجات",
    },
  });

  const controllerRole = await prisma.role.upsert({
    where: { id: "controller-role-id" },
    update: {},
    create: {
      id: "controller-role-id",
      name: RoleName.controller,
      description: "مراقب - يمكنه إدارة الصفوف والطلاب",
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { id: "student-role-id" },
    update: {},
    create: {
      id: "student-role-id",
      name: RoleName.student,
      description: "طالب - يمكنه عرض النتائج الخاصة به",
    },
  });

  return { adminRole, teacherRole, controllerRole, studentRole };
}

async function createUsers(roles: any) {
  console.log("إنشاء المستخدمين...");

  const passwordHash = await hash("123456", 10);

  // Create the admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "admin",
      password: passwordHash,
    },
  });

  // Assign admin, teacher, and controller roles to the admin user
  await prisma.userRole.createMany({
    data: [{ userId: adminUser.id, roleId: roles.adminRole.id }],
    skipDuplicates: true,
  });

  // إنشاء مدرسين
  const teachers = [];
  for (let i = 1; i <= 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const teacher = await prisma.user.upsert({
      where: { email: `teacher${i}@example.com` },
      update: {},
      create: {
        email: `teacher${i}@example.com`,
        name: `${firstName} ${lastName}`,
        password: passwordHash,
      },
    });
    teachers.push(teacher);
  }

  // إنشاء مراقبين
  const controllers = [];
  for (let i = 1; i <= 5; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const controller = await prisma.user.upsert({
      where: { email: `controller${i}@example.com` },
      update: {},
      create: {
        email: `controller${i}@example.com`,
        name: `${firstName} ${lastName}`,
        password: passwordHash,
      },
    });
    controllers.push(controller);
  }

  return { adminUser, teachers, controllers };
}
main()
  .catch((e) => {
    console.error("حدث خطأ أثناء ملئ قاعدة البيانات:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
