import clsx from "clsx";
import React from "react";
import { ActionManager } from "../actions/manager";
import { t } from "../i18n";
import { AppState } from "../types";
import { UndoRedoActions, ShapesSwitcher } from "./Actions";
import { HintViewer } from "./HintViewer";
import { Island } from "./Island";
import { LockButton } from "./LockButton";
import { Section } from "./Section";
import Stack from "./Stack";
import "./LayerUI.scss";
import "./Toolbar.scss";
import { PenModeButton } from "./PenModeButton";
import { HandButton } from "./HandButton";
import { isHandToolActive } from "../appState";

export const ShapesToolbar = ({
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
  <Section heading="shapes" className="shapes-section">
    {(heading: React.ReactNode) => (
      <div style={{ position: "relative" }}>
        {renderWelcomeScreen && <tunnels.welcomeScreenToolbarHintTunnel.Out />}
        <Stack.Col gap={4} align="start">
          <Stack.Row
            gap={1}
            className={clsx("App-toolbar-container", {
              "zen-mode": appState.zenModeEnabled,
            })}
          >
            <Island
              padding={1}
              className={clsx("App-toolbar", {
                "zen-mode": appState.zenModeEnabled,
              })}
            >
              <HintViewer
                appState={appState}
                elements={elements}
                isMobile={device.isMobile}
                device={device}
              />
              {heading}
              <Stack.Row gap={1}>
                <UndoRedoActions
                  renderAction={actionManager.renderAction}
                  className={clsx("zen-mode-transition", {
                    "layer-ui__wrapper__footer-left--transition-bottom":
                      appState.zenModeEnabled,
                  })}
                />
                <PenModeButton
                  zenModeEnabled={appState.zenModeEnabled}
                  checked={appState.penMode}
                  onChange={onPenModeToggle}
                  title={t("toolBar.penMode")}
                  penDetected={appState.penDetected}
                />
                <LockButton
                  checked={appState.activeTool.locked}
                  onChange={onLockToggle}
                  title={t("toolBar.lock")}
                />

                <div className="App-toolbar__divider"></div>

                <HandButton
                  checked={isHandToolActive(appState)}
                  onChange={() => onHandToolToggle()}
                  title={t("toolBar.hand")}
                  isMobile
                />

                <ShapesSwitcher
                  appState={appState}
                  canvas={canvas}
                  activeTool={appState.activeTool}
                  setAppState={setAppState}
                  onImageAction={({ pointerType }) => {
                    onImageAction({
                      insertOnCanvasDirectly: pointerType !== "mouse",
                    });
                  }}
                />
              </Stack.Row>
            </Island>
          </Stack.Row>
        </Stack.Col>
      </div>
    )}
  </Section>
);
