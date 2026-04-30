import type { ReactNode } from "react";

type PanelHeaderProps = {
  title: string;
  rightContent?: ReactNode;
};

export function PanelHeader({ title, rightContent }: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <span className="panel-title">{title}</span>
      {rightContent ? <div className="panel-header-right">{rightContent}</div> : null}
    </div>
  );
}
