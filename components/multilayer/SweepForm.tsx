import { RootState, AppDispatch } from "@/store/store";
import { editSweep } from "@/store/modelSlice";
import "@/components/multilayer/SweepForm.css";

import { useSelector, useDispatch } from "react-redux";
import { validateSweep } from "@/lib/data-helpers";

import InputFloat from "@/components/InputFloat";

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

    if (e.target.name === "angle") {
      newSweep.angle = parseFloat(e.target.value);
    }

    if (e.target.name === "frequency") {
      newSweep.frequency = parseFloat(e.target.value);
    }

    validateSweep(newSweep, wasEndChanged);
    dispatch(editSweep(newSweep)); // If the sweeps doesn't change the state stays the same.
  }

  return (
    <div id="sweep-form">
      <h2>
        {sweep.isLogarithmic ? "Logarithmic" : "Linear"}{" "}
        {sweep.isFrequency ? "Frequency" : "Angular"} Sweep
      </h2>
      <div>
        <label htmlFor="start" className="col1">
          Starting {sweep.isFrequency ? "Frequency (Hz)" : "Angle °"}
        </label>
        <InputFloat
          className="col2"
          id="start"
          name="start"
          min={0}
          max={undefined}
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
          Ending {sweep.isFrequency ? "Frequency (Hz)" : "Angle °"}
        </label>
        <InputFloat
          className="col2"
          id="end"
          name="end"
          min={0}
          max={undefined}
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
        {sweep.isFrequency ? (
          <>
            <label htmlFor="angle" className="col3-1">
              Fixed Angle
            </label>
            <InputFloat
              className="col4-1"
              id="angle"
              name="angle"
              min={0}
              max={90}
              value={sweep.angle}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <label htmlFor="frequency" className="col3-1">
              Fixed Frequency
            </label>
            <InputFloat
              className="col4-1"
              id="frequency"
              name="frequency"
              min={0}
              max={undefined}
              value={sweep.frequency}
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
