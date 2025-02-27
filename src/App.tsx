import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
//import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { dataProvider } from "./providers/data-provider";
import { UserList } from "./pages/users/list";
import { UserCreate, UserEdit, UserShow } from "./pages/users";
import { EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow } from "./pages/employees";
import { ProjectCreate, ProjectEdit, ProjectList, ProjectShow } from "./pages/projects";
import { FileManagerCreate, FileManagerEdit, FileManagerList, FileManagerShow } from "./pages/filemanagers";
import { FolderOutlined, ProjectOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { accessControlProvider } from "./providers/accessControlProvider";

function App() {
  return (
    (<BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine 
              
              dataProvider={dataProvider}
              
                notificationProvider={useNotificationProvider}
               authProvider={authProvider}
               accessControlProvider={accessControlProvider}
               routerProvider={routerBindings}
                resources={[{
                  name: "user",
                  list: "/user",
                  create: "/user/create",
                  edit: "/user/edit/:id",
                  show: "/user/show/:id",
                  icon: <UserOutlined />,
                  meta: { canAccess: "admin" }
                }, {
                  name: "employee",
                  list: "/employee",
                  create: "/employee/create",
                  edit: "/employee/edit/:id",
                  show: "/employee/show/:id",
                  icon: <TeamOutlined />,
                  meta: { canCreate: ["admin"] },
                }, {
                  name: "project",
                  list: "/project",
                  create: "/project/create",
                  edit: "/project/edit/:id",
                  show: "/project/show/:id",
                  icon: <ProjectOutlined />,
                  meta: { canCreate: ["admin"] },
                }, {
                  name: "fileManager",
                  list: "/fileManager",
                  create: "/fileManager/create",
                  edit: "/fileManager/edit/:id",
                  show: "/fileManager/show/:id",
                  icon: <FolderOutlined />,
                  meta: { canCreate: ["admin"] },
                }, 
              ]}
              
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "LNCrMx-maY4xf-6sbR1P",
                  title: { text: "Primotech Thailand", icon: <AppIcon /> },
                }}
              >
                
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="user" />}
                    />
                      <Route path="/user">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>

                    <Route
                      index
                      element={<NavigateToResource resource="employee" />}
                    />
                      <Route path="/employee">
                      <Route index element={<EmployeeList />} />
                      <Route path="create" element={<EmployeeCreate />} />
                      <Route path="edit/:id" element={<EmployeeEdit />} />
                      <Route path="show/:id" element={<EmployeeShow />} />
                    </Route>

                    <Route path="/project">
                      <Route index element={<ProjectList />} />
                      <Route path="create" element={<ProjectCreate />} />
                      <Route path="edit/:id" element={<ProjectEdit />} />
                      <Route path="show/:id" element={<ProjectShow />} />
                    </Route>

                    <Route path="/fileManager">
                      <Route index element={<FileManagerList />} />
                      <Route path="create" element={<FileManagerCreate />} />
                      <Route path="edit/:id" element={<FileManagerEdit />} />
                      <Route path="show/:id" element={<FileManagerShow />} />
                    </Route>
                   
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>)
  );
}

export default App;
