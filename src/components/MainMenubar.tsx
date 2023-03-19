import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import "./MainMenubar.scss";

import { createUndoAction, createRedoAction } from "../actions/actionHistory";

import {
  actionClearCanvas,
  actionLoadScene,
  actionSaveToActiveFile,
  actionShortcuts,
  actionToggleTheme,
} from "../actions";

import {
  useExcalidrawAppState,
  useExcalidrawSetAppState,
  useExcalidrawActionManager,
} from "./App";
import { useI18n } from "../i18n";

import { useAtom, useSetAtom } from "jotai";
import { activeConfirmDialogAtom } from "./ActiveConfirmDialog";
import { jotaiScope } from "../jotai";

import { MainMenu } from "../packages/excalidraw/index";
import { LanguageList } from "../excalidraw-app/components/LanguageList";

import DropdownMenu from "./dropdownMenu/DropdownMenu";

import { collabDialogShownAtom } from "../excalidraw-app/collab/Collab";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

export const MainMenubar = () => {
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

  const actionManager = useExcalidrawActionManager();

  const setAppState = useExcalidrawSetAppState();
  const { t } = useI18n();

  const { h } = window;
  const undoAction = createUndoAction(h.history);
  const redoAction = createRedoAction(h.history);

  const setActiveConfirmDialog = useSetAtom(
    activeConfirmDialogAtom,
    jotaiScope,
  );

  const appState = useExcalidrawAppState();

  const [, setCollabDialogShown] = useAtom(collabDialogShownAtom);

  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">File</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item
              className="MenubarItem"
              onSelect={() =>
                actionManager.executeAction(actionSaveToActiveFile)
              }
            >
              Save <div className="RightSlot">⌘ S</div>
            </Menubar.Item>
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => {
                setAppState({ openDialog: "jsonExport" });
              }}
            >
              Save to...
            </Menubar.Item>
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => setAppState({ openDialog: "imageExport" })}
            >
              Export image... <div className="RightSlot">⇧ ⌘ E</div>
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => setCollabDialogShown(true)}
            >
              Live collaboration...
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => window.print()}
            >
              Print… <div className="RightSlot">⌘ P</div>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Edit</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => actionManager.executeAction(undoAction)}
            >
              Undo <div className="RightSlot">⌘ Z</div>
            </Menubar.Item>
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => actionManager.executeAction(redoAction)}
            >
              Redo <div className="RightSlot">⇧ ⌘ Z</div>
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => setActiveConfirmDialog("clearCanvas")}
            >
              Reset canvas
            </Menubar.Item>
            {/* <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
                Find
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="MenubarSubContent"
                  alignOffset={-5}
                >
                  <Menubar.Item className="MenubarItem">
                    Search the web…
                  </Menubar.Item>
                  <Menubar.Separator className="MenubarSeparator" />
                  <Menubar.Item className="MenubarItem">Find…</Menubar.Item>
                  <Menubar.Item className="MenubarItem">Find Next</Menubar.Item>
                  <Menubar.Item className="MenubarItem">
                    Find Previous
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem">Cut</Menubar.Item>
            <Menubar.Item className="MenubarItem">Copy</Menubar.Item>
            <Menubar.Item className="MenubarItem">Paste</Menubar.Item> */}
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">View</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            {/* {CHECK_ITEMS.map((item) => (
              <Menubar.CheckboxItem
                className="MenubarCheckboxItem inset"
                key={item}
                checked={checkedSelection.includes(item)}
                onCheckedChange={() =>
                  setCheckedSelection((current) =>
                    current.includes(item)
                      ? current.filter((el) => el !== item)
                      : current.concat(item),
                  )
                }
              >
                <Menubar.ItemIndicator className="MenubarItemIndicator">
                  <CheckIcon />
                </Menubar.ItemIndicator>
                {item}
              </Menubar.CheckboxItem>
            ))}
            <Menubar.Separator className="MenubarSeparator" /> */}
            <Menubar.Item
              className="MenubarItem inset"
              onSelect={() => window.location.reload()}
            >
              Reload <div className="RightSlot">⌘ R</div>
            </Menubar.Item>
            <Menubar.CheckboxItem
              className="MenubarCheckboxItem inset"
              onSelect={(event) => {
                // do not close the menu when changing theme
                event.preventDefault();
                return actionManager.executeAction(actionToggleTheme);
              }}
              checked={appState.theme === "dark"}
            >
              <Menubar.ItemIndicator className="MenubarItemIndicator">
                <CheckIcon />
              </Menubar.ItemIndicator>
              Dark mode <div className="RightSlot">⇧ ⌘ D</div>
            </Menubar.CheckboxItem>
            {/* <Menubar.Item className="MenubarItem inset" disabled>
              Force Reload <div className="RightSlot">⇧ ⌘ R</div>
            </Menubar.Item> */}
            {/* TODO: These probably should be reenabled in future, but
                are currently not implemented. */}
            {/* <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem inset">
              Toggle Fullscreen
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem inset">
              Hide Sidebar
            </Menubar.Item> */}
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Help</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item
              className="MenubarItem"
              onSelect={() => actionManager.executeAction(actionShortcuts)}
            >
              Keyboard shortcuts <div className="RightSlot">?</div>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Other</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContentLegacy excalidraw dropdown-menu"
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            <MainMenu.ItemCustom>
              <LanguageList style={{ width: "100%" }} />
            </MainMenu.ItemCustom>
            <MainMenu.DefaultItems.ChangeCanvasBackgroundInline />
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      {/* <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Profiles</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-14}
          >
            <Menubar.RadioGroup
              value={radioSelection}
              onValueChange={setRadioSelection}
            >
              {RADIO_ITEMS.map((item) => (
                <Menubar.RadioItem
                  className="MenubarRadioItem inset"
                  key={item}
                  value={item}
                >
                  <Menubar.ItemIndicator className="MenubarItemIndicator">
                    <DotFilledIcon />
                  </Menubar.ItemIndicator>
                  {item}
                </Menubar.RadioItem>
              ))}
              <Menubar.Separator className="MenubarSeparator" />
              <Menubar.Item className="MenubarItem inset">Edit…</Menubar.Item>
              <Menubar.Separator className="MenubarSeparator" />
              <Menubar.Item className="MenubarItem inset">
                Add Profile…
              </Menubar.Item>
            </Menubar.RadioGroup>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu> */}
    </Menubar.Root>
  );
};
