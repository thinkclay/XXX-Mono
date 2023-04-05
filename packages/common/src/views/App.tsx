/** @format */

import { useRecoilValue } from "recoil";

import { menuState, routeState } from "@common/helpers/root";
import HomeScreen from "@common/views/HomeScreen";
import AccountScreen from "@common/views/Auth/AccountScreen";
import AuthScreen from "@common/views/Auth/AuthScreen";
import PrimaryNav from "@common/views/Navigation/PrimaryNav";
import { RenderMode } from "@common/types/UI";
import Settings from "./Settings/Settings";

interface AppProps {
  mode: RenderMode;
}

function App(screen: AppProps) {
  const route = useRecoilValue(routeState);
  const menuOpen = useRecoilValue(menuState);

  const _renderView = (route: string) => {
    switch (route) {
      case "/account":
        return <AccountScreen {...screen} />;

      case "/auth":
        return <AuthScreen {...screen} />;

      case "/settings":
        return <Settings {...screen} />;

      default:
        return <HomeScreen {...screen} />;
    }
  };

  return (
    <div id="RevisionApp">
      <PrimaryNav open={menuOpen} />
      <div className={`Overlay ${menuOpen ? "visible" : ""}`}></div>
      {_renderView(route)}
    </div>
  );
}

export default App;
