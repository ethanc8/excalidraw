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

import { hasStrokeColor, hasStrokeWidth } from "../scene/comparisons";

import {
  ArrowIcon,
  DiamondIcon,
  EllipseIcon,
  EraserIcon,
  FreedrawIcon,
  ImageIcon,
  LineIcon,
  RectangleIcon,
  SelectionIcon,
  TextIcon,
} from "./icons";
import { KEYS } from "../keys";

import { getTargetElements } from "../scene";
import { getNonDeletedElements } from "../element";

import "./DrawToolbar.scss";

export const DrawShapes = [
  {
    icon: SelectionIcon,
    value: "selection",
    key: KEYS.V,
    numericKey: KEYS["1"],
    fillable: true,
  },
  {
    icon: FreedrawIcon,
    value: "freedraw",
    key: [KEYS.P, KEYS.X],
    numericKey: KEYS["7"],
    fillable: false,
  },
  {
    icon: EraserIcon,
    value: "eraser",
    key: KEYS.E,
    numericKey: KEYS["0"],
    fillable: false,
  },
] as const;

export const DrawToolbar = ({
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
}) => {
  const targetElements = getTargetElements(
    getNonDeletedElements(elements),
    appState,
  );

  const commonSelectedType: string | null = targetElements[0]?.type || null;

  return (
    <Section heading="shapes" className="shapes-section">
      {(heading: React.ReactNode) => (
        <div style={{ position: "relative" }}>
          {renderWelcomeScreen && (
            <tunnels.welcomeScreenToolbarHintTunnel.Out />
          )}
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
                  <Stack.Col
                    style={{
                      height: "100%",
                      // justifyContent: "space-evenly",
                      alignContent: "space-evenly",
                    }}
                  >
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
                  </Stack.Col>

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
                    shapes={DrawShapes}
                  />

                  <div>
                    {((hasStrokeColor(appState.activeTool.type) &&
                      appState.activeTool.type !== "image" &&
                      commonSelectedType !== "image") ||
                      targetElements.some((element) =>
                        hasStrokeColor(element.type),
                      )) &&
                      actionManager.renderAction("changeStrokeColorInline")}
                  </div>
                  <div className="DrawToolbar__strokeWidth">
                    {(hasStrokeWidth(appState.activeTool.type) ||
                      targetElements.some((element) =>
                        hasStrokeWidth(element.type),
                      )) &&
                      actionManager.renderAction("changeStrokeWidthInline")}
                  </div>
                </Stack.Row>
              </Island>
            </Stack.Row>
          </Stack.Col>
        </div>
      )}
    </Section>
  );
};

/*
<ColorPicker
          label={t("labels.canvasBackground")}
          type="canvasBackground"
          color={appState.viewBackgroundColor}
          onChange={(color) => updateData({ viewBackgroundColor: color })}
          isActive={appState.openPopup === "canvasColorPicker"}
          setActive={(active) =>
            updateData({ openPopup: active ? "canvasColorPicker" : null })
          }
          data-testid="canvas-background-picker"
          elements={elements}
          appState={appState}
        />
<ColorPicker
        type="elementStroke"
        label={t("labels.stroke")}
        color={getFormValue(
          elements,
          appState,
          (element) => element.strokeColor,
          appState.currentItemStrokeColor,
        )}
        onChange={(color) => updateData({ currentItemStrokeColor: color })}
        isActive={appState.openPopup === "strokeColorPicker"}
        setActive={(active) =>
          updateData({ openPopup: active ? "strokeColorPicker" : null })
        }
        elements={elements}
        appState={appState}
      />
<ColorPicker
        type="elementBackground"
        label={t("labels.background")}
        color={getFormValue(
          elements,
          appState,
          (element) => element.backgroundColor,
          appState.currentItemBackgroundColor,
        )}
        onChange={(color) => updateData({ currentItemBackgroundColor: color })}
        isActive={appState.openPopup === "backgroundColorPicker"}
        setActive={(active) =>
          updateData({ openPopup: active ? "backgroundColorPicker" : null })
        }
        elements={elements}
        appState={appState}
      />
*/
