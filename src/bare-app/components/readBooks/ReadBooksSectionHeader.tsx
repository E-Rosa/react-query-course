import {
  VinminH2,
  vinminPaginationIconBlack,
  vinminPaginationIconWhite,
  vinminStackIcon,
  VinminTabs,
} from "@eliasrrosa/vinmin";
import AddButton from "../buttons/AddButton";

export type ReadBooksSectionHeaderTab = "stack" | "pagination";
interface ReadBooksSectionHeaderProps {
  className?: string;
  onTabChange?: (tabName: ReadBooksSectionHeaderTab) => void;
  activeTab: ReadBooksSectionHeaderTab;
  onAddButtonClick?: () => void;
}

function ReadBooksSectionHeader(props: ReadBooksSectionHeaderProps) {
  return (
    <div className={`flex justify-between ${props.className}`}>
      <VinminH2>Books I Read</VinminH2>
      <div className="flex gap-2">
        {props.onAddButtonClick && (
          <AddButton className="w-[3.8em]" onClick={props.onAddButtonClick} />
        )}
        <VinminTabs
          tabs={[
            {
              iconActive: vinminStackIcon("white"),
              iconInactive: vinminStackIcon("black"),
              isActive: props.activeTab == "stack" ? true : false,
              attributes: {
                onClick: () => {
                  props.onTabChange?.("stack");
                },
              },
            },
            {
              iconActive: vinminPaginationIconWhite,
              iconInactive: vinminPaginationIconBlack,
              isActive: props.activeTab == "pagination" ? true : false,
              attributes: {
                onClick: () => {
                  props.onTabChange?.("pagination");
                },
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ReadBooksSectionHeader;
