"use client";

import { AcademicYearCard } from "@/components/dashboard/AcademicYearCard";
import { NoRoles } from "@/components/dashboard/NoRoles";
import { NotificationsCard } from "@/components/dashboard/NotificationsCard";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { useLanguage } from "@/components/providers/LanguageProvider";
import getAllClasses from "@/lib/actions/dashboard/classes/getAll";
import getAllLevels from "@/lib/actions/dashboard/levels/getAll";
import getAllRoles from "@/lib/actions/dashboard/roles/getAll";
import getAllStudents from "@/lib/actions/dashboard/students/getAll";
import getAllSubjects from "@/lib/actions/dashboard/subjects/getAll";
import {
  getAllControllers,
  getAllTeachers,
} from "@/lib/actions/dashboard/userRoles/getAll";
import getAllUsers from "@/lib/actions/dashboard/users/getAll";
import {
  Classroom,
  Level,
  Role,
  Student,
  Subject,
  User,
} from "@/prisma/lib/generated/prisma";
import { IUsersWithRoles } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data } = useSession();
  const { language } = useLanguage();
  if (data?.user.roles.length === 0) return <NoRoles language={language} />;
  const [levels, setLevels] = useState<Level[]>([]);
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<IUsersWithRoles[]>([]);
  const [controllers, setControllers] = useState<IUsersWithRoles[]>([]);

  useEffect(() => {
    const getAll = async () => {
      const getLevels = async () => {
        const levelsResult = await getAllLevels(language);
        if (levelsResult.success) {
          setLevels(levelsResult.data as Level[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب المستويات"
              : "Error In Getting Levels",
            {
              description: levelsResult.error,
            }
          );
        }
      };
      const getClasses = async () => {
        const classesResult = await getAllClasses(language);
        if (classesResult.success) {
          setClasses(classesResult.data as Classroom[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب الفصول"
              : "Error In Getting Classes",
            {
              description: classesResult.error,
            }
          );
        }
      };
      const getStudents = async () => {
        const studentsResult = await getAllStudents(language);
        if (studentsResult.success) {
          setStudents(studentsResult.data as Student[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب الطلاب"
              : "Error In Getting Students",
            {
              description: studentsResult.error,
            }
          );
        }
      };
      const getSubjects = async () => {
        const subjectsResult = await getAllSubjects(language);
        if (subjectsResult.success) {
          setSubjects(subjectsResult.data as Subject[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب المواد"
              : "Error In Getting Subjects",
            {
              description: subjectsResult.error,
            }
          );
        }
      };

      const getRoles = async () => {
        const rolesResult = await getAllRoles(language);
        if (rolesResult.success) {
          setRoles(rolesResult.data as Role[]);
        } else {
          toast.error(
            language === "AR" ? "خطأ في جلب الادوار" : "Error In Getting Roles",
            {
              description: rolesResult.error,
            }
          );
        }
      };
      const getUsers = async () => {
        const usersResult = await getAllUsers(language);
        if (usersResult.success) {
          setUsers(usersResult.data as User[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب المستخدمين"
              : "Error In Getting Users",
            {
              description: usersResult.error,
            }
          );
        }
      };
      const getTeachers = async () => {
        const teachersResult = await getAllTeachers(language);
        if (teachersResult.success) {
          setTeachers(teachersResult.data as IUsersWithRoles[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب المدرسين"
              : "Error In Getting Teachers",
            {
              description: teachersResult.error,
            }
          );
        }
      };
      const getControllers = async () => {
        const controllersResult = await getAllControllers(language);
        if (controllersResult.success) {
          setControllers(controllersResult.data as IUsersWithRoles[]);
        } else {
          toast.error(
            language === "AR"
              ? "خطأ في جلب المتحكمين"
              : "Error In Getting Controllers",
            {
              description: controllersResult.error,
            }
          );
        }
      };

      getLevels();
      getClasses();
      getStudents();
      getSubjects();
      getRoles();
      getUsers();
      getTeachers();
      getControllers();
    };
    getAll();

    return () => {
      getAll();
    };
  }, [levels]);

  // Sample statistics data
  const statistics = [
    {
      id: 1,
      title: language === "AR" ? "المستويات" : "Levels",
      count: levels.length,
      icon: "layers",
    },
    {
      id: 2,
      title: language === "AR" ? "الفصول" : "Classes",
      count: classes.length,
      icon: "layout-grid",
    },
    {
      id: 3,
      title: language === "AR" ? "الطلاب" : "Students",
      count: students.length,
      icon: "users",
    },

    {
      id: 4,
      title: language === "AR" ? "المواد" : "Subjects",
      count: subjects.length,
      icon: "book",
    },
    {
      id: 5,
      title: language === "AR" ? "الأدوار" : "Roles",
      count: roles.length,
      icon: "shield",
    },
    {
      id: 6,
      title: language === "AR" ? "المستخدمين" : "Users",
      count: users.length,
      icon: "user",
    },
    {
      id: 7,
      title: language === "AR" ? "المراقبين" : "Controllers",
      count: controllers.length,
      icon: "eye",
    },
    {
      id: 8,
      title: language === "AR" ? "المعلمين" : "Teachers",
      count: teachers.length,
      icon: "pen-tool",
    },
  ];
  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Academic Year Card */}
      <div className="mb-8">
        <AcademicYearCard />
      </div>
      {/* Statistics and Notifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Statistics Cards */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat) => (
            <StatisticsCard
              key={stat.id}
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Notifications Card */}
        <div className="col-span-1 row-span-3">
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
}
