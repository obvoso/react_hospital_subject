interface params {
  label: string;
  isOn: boolean;
  handleToggle: () => void;
  disabled: boolean;
}

export function Toggle({ label, isOn, handleToggle, disabled }: params) {
  return (
    <label className="flex flex-col items-center cursor-pointer w-fit">
      <span className="text-sm  font-semibold text-gray-700">{label}</span>
      <div className={`relative mt-1 ${disabled && "cursor-not-allowed"}`}>
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={`block w-12  h-6  rounded-full ${
            isOn ? "bg-blue-400" : "bg-gray-400"
          }`}
        />
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
            isOn && "transform translate-x-6"
          }`}
        />
      </div>
    </label>
  );
}
