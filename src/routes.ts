import { authenticateToken, restrictToRole } from "./auth/auth.service";
import { login } from "./controllers/AuthActions";
import { branchDeleteAction, branchGetAllAction, branchGetByIdAction, branchSaveAction, branchUpdateAction } from "./controllers/BranchActions";
import { userDeleteAction, userGetAllAction, userGetByIdAction, userSaveAction, userUpdateAction } from "./controllers/UserActions";
import { Role } from "./entity/User";

export const AppRoutes = [
    {
        path: "/api/auth/login",
        method: "post",
        action: [login ]
    },
    {
        path: "/api/users",
        method: "get",
        action: [userGetAllAction ]
    },
    {
        path: "/api/users",
        method: "post",
        action: [userSaveAction ]
    },
    {
        path: "/api/users/:id",
        method: "get",
        action: [userGetByIdAction ]
    },
    {
        path: "/api/users/:id",
        method: "put",
        action: [userUpdateAction ]
    },
    {
        path: "/api/users/:id",
        method: "delete",
        action: [userDeleteAction ]
    },
    {
        path: "/api/branches",
        method: "get",
        action: [authenticateToken, branchGetAllAction ]
    },
    {
        path: "/api/branches",
        method: "post",
        action: [authenticateToken, branchSaveAction ]
    },
    {
        path: "/api/branches/:id",
        method: "get",
        action: [authenticateToken, branchGetByIdAction ]
    },
    {
        path: "/api/branches/:id",
        method: "put",
        action: [authenticateToken, restrictToRole(Role.OWNER), branchUpdateAction ]
    },
    {
        path: "/api/branches/:id",
        method: "delete",
        action: [authenticateToken, branchDeleteAction ]
    },
];