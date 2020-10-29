import SearchPage from "./modules/search/SearchPage/SearchPage";

interface route {
  path: string,
  component: React.FunctionComponent
}

const routes: route[] = [
  {
    path: "/",
    component: SearchPage,
  }
];

export default routes;
