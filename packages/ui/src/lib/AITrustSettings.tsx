type AITrustSettingsProps = {
  requireConfirmation: boolean;
  disclosureEnabled: boolean;
};

export function AITrustSettings({ requireConfirmation, disclosureEnabled }: AITrustSettingsProps) {
  return (
    <div className="ai-trust-settings">
      <div className="ai-trust-row">
        <div>
          <strong>Creator confirmation</strong>
          <p>AI suggestions must be reviewed before they change project output.</p>
        </div>
        <span className={`trust-pill${requireConfirmation ? " active" : ""}`}>
          {requireConfirmation ? "Required" : "Off"}
        </span>
      </div>

      <div className="ai-trust-row">
        <div>
          <strong>Disclosure badge</strong>
          <p>AI-assisted areas should always show visible disclosure in the shell.</p>
        </div>
        <span className={`trust-pill${disclosureEnabled ? " active" : ""}`}>
          {disclosureEnabled ? "Visible" : "Hidden"}
        </span>
      </div>

      <p className="ai-trust-footnote">
        This is the sprint-1 trust scaffold. Actual AI actions in later epics must respect these guardrails.
      </p>
    </div>
  );
}
