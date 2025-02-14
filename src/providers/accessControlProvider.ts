import type { AccessControlProvider, CanParams } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }: CanParams) => {
    const role = localStorage.getItem("USER_ROLE");

    if (!role) return { can: false };

    const adminResources = ["user", "employee", "project", "fileManager"];
    const userResources = ["employee","project", "fileManager"];

    // ถ้าไม่มี resource หรือ action ถูกส่งมา → ไม่อนุญาต
    if (!resource || !action) {
      return { can: false };
    }

    if (role === "admin") {
      return { can: true };
    }

    if (role === "user") {
      if (resource === "project") {
        if (["create", "edit", "delete"].includes(action)) {
          return { can: false }; // ❌ ไม่ให้ User กดปุ่ม
        }
        return { can: true }; // ✅ User ดู Project ได้
      }
      if (resource === "employee") {
        if (["create", "edit", "delete"].includes(action)) {
          return { can: false }; // ❌ User ห้ามสร้าง, แก้ไข, ลบ Employee
        }
        return { can: true }; // ✅ User ดู Employee ได้
      }

      return { can: userResources.includes(resource) };
    }

    return { can: false };
  },
};
