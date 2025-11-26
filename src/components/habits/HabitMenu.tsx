import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import FormModalWrapper from "../modals/FormModalWrapper";

const HabitMenu = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        {/* <ModalWrapper trigger="Add New" title="Add New Habit">
          <div>Hello</div>
        </ModalWrapper> */}
        <Button type="button" variant="outline">
          Search
        </Button>
      </div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Progress</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>30%</MenubarItem>
                <MenubarItem>60%</MenubarItem>
                <MenubarItem>90%</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Month</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Jan</MenubarItem>
                <MenubarItem>Feb</MenubarItem>
                <MenubarItem>Mar</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Status</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Active</MenubarItem>
                <MenubarItem>Inactive</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Date Created</MenubarItem>
            <MenubarItem>Interactions</MenubarItem>
            <MenubarItem>Streaks</MenubarItem>
            <MenubarItem>Progress</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default HabitMenu;
