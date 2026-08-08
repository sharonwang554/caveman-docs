import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/acme-enterprise-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "api/list-users",
          label: "List all users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-user",
          label: "Create a new user",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
