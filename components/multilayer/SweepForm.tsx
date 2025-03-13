import { RootState, AppDispatch } from "@/store/store";
import { editSweep } from "@/store/modelSlice";
import "@/components/multilayer/SweepForm.css";

import { useSelector, useDispatch } from "react-redux";
import { validateSweep } from "@/lib/data-helpers";

export default function SweepForm() {
  const dispatch = useDispatch<AppDispatch>();
  const sweep = useSelector((state: RootState) => state.model.model.sweep);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("Checkbox changed.");
    console.log(e.target.checked);

    let wasEndChanged = false;
    const newSweep = { ...sweep };

    if (e.target.name === "numSteps") {
      newSweep.numSteps = parseFloat(e.target.value);
    }

    if (e.target.name === "start") {
      newSweep.start = parseFloat(e.target.value);
    }

    if (e.target.name === "end") {
      wasEndChanged = true;
      newSweep.end = parseFloat(e.target.value);
    }

    if (e.target.name === "isLogarithmic") {
      newSweep.isLogarithmic = !newSweep.isLogarithmic;
    }

    if (e.target.name === "isFrequency") {
      newSweep.isFrequency = !newSweep.isFrequency;
    }
    validateSweep(newSweep, wasEndChanged);
    dispatch(editSweep(newSweep));
  }

  return (
    <div id="sweep-form">
      <h2>
        {sweep.isLogarithmic ? "Logarithmic" : "Linear"}{" "}
        {sweep.isFrequency ? "Frequency" : "Angular"} Sweep
      </h2>
      <div>
        <label htmlFor="start" className="col1">
          Starting {sweep.isFrequency ? "Frequency kHz" : "Angle °"}
        </label>
        <input
          className="col2"
          id="start"
          name="start"
          type="number"
          step="any"
          min="0"
          value={sweep.start}
          onChange={handleChange}
        />

        <label htmlFor="isFrequency" className="col3">
          Check for {sweep.isFrequency ? "Angular" : "Frequency"} Sweep
        </label>
        <input
          className="col4"
          id="isFrequency"
          name="isFrequency"
          type="checkbox"
          checked={false}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="end" className="col1">
          Ending {sweep.isFrequency ? "Frequency kHz" : "Angle °"}
        </label>
        <input
          className="col2"
          id="end"
          name="end"
          type="number"
          step="any"
          min="0"
          value={sweep.end}
          onChange={handleChange}
        />
        <label htmlFor="isLogarithmic" className="col3">
          Check for {sweep.isLogarithmic ? "Linear" : "Logarithmic"} Spacing
        </label>
        <input
          className="col4"
          id="isLogarithmic"
          name="isLogarithmic"
          type="checkbox"
          checked={false}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="numSteps" className="col1">
          Number of {sweep.isFrequency ? "Frequency" : "Angle"} steps
        </label>
        <input
          className="col2"
          id="numSteps"
          name="numSteps"
          type="number"
          step="1"
          min={0}
          value={sweep.numSteps}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
