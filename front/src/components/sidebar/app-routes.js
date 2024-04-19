import { withNavigationWatcher } from './contexts/navigation';
import React, { lazy } from "react";

const routes = [
    // 홈
  {
    path: "home",
    name: "main",
    element: React.lazy(() => import("../../pages/sample/CustomTableSample")
    ),
  },
    //샘플 소스 > 샘플 게시판
  {
    path: "/sample/CustomTableSample",
    name: "CustomTableSample",
    element: React.lazy(() => import("../../pages/sample/CustomTableSample")),
  },
  // 샘플게시판 상세
  {
    path: "/sample/ComponentSampleDetail",
    name: "ComponentSampleDetail",
    element: React.lazy(() => import("../../pages/sample/ComponentSampleDetail"))
  },
  // 샘플게시판 상세 (CustomHorizontalTable)
  {
    path: "/sample/CustomHorizontalTableSample",
    name: "CustomHorizontalTableSample",
    element: React.lazy(() => import("../../pages/sample/CustomHorizontalTableSample"))
  },
  // 샘플 게시글 등록
  {
    path: "/sample/BoardInputFormSample",
    name: "BoardInputFormSample",
    element: React.lazy(() => import("../../pages/sample/BoardInputFormSample"))
  },
  //컴포넌트 샘플 소스 인서트 보드
  {
    path: "/sample/ComponenetSampleInsert",
    name: "ComponenetSampleInsert",
    element: React.lazy(() => import("../../pages/sample/ComponenetSampleInsert"))
  },
  //CustomEditTable 샘플 
  {
    path: "/sample/CustomEditTableSample",
    name: "CustomEditTableSample",
    element: React.lazy(() => import("../../pages/sample/CustomEditTableSample"))
  },
  //CustomAddTable 샘플 
  {
    path: "/sample/CustomAddTableSample",
    name: "CustomAddTableSample",
    element: React.lazy(() => import("../../pages/sample/CustomAddTableSample"))
  }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
