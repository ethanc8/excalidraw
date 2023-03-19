import * as Tabs from "@radix-ui/react-tabs";

import { ActionManager } from "../actions/manager";
import { AppState } from "../types";

import { ShapesToolbar } from "./ShapesToolbar";
import { DrawToolbar } from "./DrawToolbar";

import "./Ribbon.scss";

export const Ribbon = ({
  renderWelcomeScreen,
  tunnels,
  appState,
  elements,
  device,
  actionManager,
  onPenModeToggle,
  onLockToggle,
  onHandToolToggle,
  canvas,
  setAppState,
  onImageAction,
}: {
  renderWelcomeScreen: boolean;
  tunnels: any;
  appState: AppState;
  elements: any;
  device: any;
  actionManager: ActionManager;
  onPenModeToggle: () => void;
  onLockToggle: () => void;
  onHandToolToggle: () => void;
  canvas: HTMLCanvasElement | null;
  setAppState: any;
  onImageAction: (data: any) => void;
}) => (
  <Tabs.Root className="TabsRoot" defaultValue="drawTab">
    <Tabs.List className="TabsList">
      <Tabs.Trigger className="TabsTrigger" value="shapesTab">
        Shapes
      </Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="drawTab">
        Draw
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content className="TabsContent" value="shapesTab">
      <ShapesToolbar
        renderWelcomeScreen={renderWelcomeScreen}
        tunnels={tunnels}
        appState={appState}
        elements={elements}
        device={device}
        actionManager={actionManager}
        onPenModeToggle={onPenModeToggle}
        onLockToggle={onLockToggle}
        onHandToolToggle={onHandToolToggle}
        canvas={canvas}
        setAppState={setAppState}
        onImageAction={onImageAction}
      />
    </Tabs.Content>
    <Tabs.Content className="TabsContent" value="drawTab">
      <DrawToolbar
        renderWelcomeScreen={renderWelcomeScreen}
        tunnels={tunnels}
        appState={appState}
        elements={elements}
        device={device}
        actionManager={actionManager}
        onPenModeToggle={onPenModeToggle}
        onLockToggle={onLockToggle}
        onHandToolToggle={onHandToolToggle}
        canvas={canvas}
        setAppState={setAppState}
        onImageAction={onImageAction}
      />
    </Tabs.Content>
  </Tabs.Root>
);
