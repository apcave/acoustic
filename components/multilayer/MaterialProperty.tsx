import { iProperty, iType, iLabel } from "@/lib/data-helpers";

interface iMaterialProperty {
  label: iLabel;
  property: iProperty;
  onChange: (property: iProperty, propType: iLabel) => void;
  compType?: iType;
}

/*
    The material property can be edited by the user.
    The changes in state are managed by the parent component.
*/
export default function MaterialProperty({
  label,
  property,
  onChange,
  compType,
}: iMaterialProperty) {
  const disable = compType === "vacuum" && label === "shear";

  let title;
  if (label === "compression") {
    title = "Compression Wave Data";
    if (property.type === "modulus") {
      title = "Compression Modulus (K) Data";
    }
  } else {
    title = "Shear Wave Data";
    if (property.type === "modulus") {
      title = "Shear Modulus (σ) Data";
    }
  }
  if (disable) {
    title = "Shear Wave Data";
  }

  function handleEdit(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = e.target.name;
    const value = e.target.value;

    console.log("MaterialProperty - ", name, value);

    if (name === label) {
      if (value === "wave") {
        onChange(
          {
            ...property,
            waveSpeed: 10,
            attenuation: 0,
            real: undefined,
            imag: undefined,
            type: value,
          },
          label
        );
      } else if (value === "modulus") {
        onChange(
          {
            ...property,
            waveSpeed: undefined,
            attenuation: undefined,
            real: 10,
            imag: 0,
            type: value,
          },
          label
        );
      } else if (value === "fluid") {
        onChange(
          {
            ...property,
            waveSpeed: undefined,
            attenuation: undefined,
            real: undefined,
            imag: undefined,
            type: value,
          },
          label
        );
      } else if (value === "vacuum") {
        onChange(
          {
            ...property,
            waveSpeed: undefined,
            attenuation: undefined,
            real: undefined,
            imag: undefined,
            type: value,
          },
          label
        );
      }
    } else if (name === `${label}-wave-speed`) {
      const waveSpeed = parseFloat(value);
      if (waveSpeed === 0) {
        let type: iType;
        if (label === "compression") {
          type = "vacuum";
        } else {
          type = "fluid";
        }
        onChange(
          {
            type,
            waveSpeed: undefined,
            attenuation: undefined,
            real: undefined,
            imag: undefined,
          },
          label
        );
      } else {
        onChange(
          {
            ...property,
            real: undefined,
            imag: undefined,
            waveSpeed,
          },
          label
        );
      }
    } else if (name === `${label}-attenuation`) {
      onChange(
        {
          ...property,
          real: undefined,
          imag: undefined,
          attenuation: parseFloat(value),
        },
        label
      );
    } else if (name === `${label}-real`) {
      const real = parseFloat(value);
      if (real < 0) {
        return;
      }

      if (real === 0) {
        let type: iType;
        if (label === "compression") {
          type = "vacuum";
        } else {
          type = "fluid";
        }
        onChange(
          {
            type,
            waveSpeed: undefined,
            attenuation: undefined,
            real: undefined,
            imag: undefined,
          },
          label
        );
      } else {
        onChange(
          {
            ...property,
            waveSpeed: undefined,
            attenuation: undefined,
            real,
          },
          label
        );
      }
    } else if (name === `${label}-imag`) {
      const imag = parseFloat(value);
      if (imag < 0) {
        return;
      }
      onChange(
        {
          ...property,
          waveSpeed: undefined,
          attenuation: undefined,
          imag: imag,
        },
        label
      );
    }
  }

  return (
    <div className="property">
      <h3>{title}</h3>
      {!disable && (
        <div>
          <label htmlFor={label}>Data Type</label>
          <select
            id={label}
            name={label}
            required
            value={property.type}
            onChange={handleEdit}
            className="border rounded-md mb-2"
          >
            <option value="wave">Wave</option>
            {label === "compression" && (
              <option value="modulus">Modulus (K)</option>
            )}
            {label === "shear" && <option value="modulus">Modulus (σ)</option>}
            {label === "compression" && <option value="vacuum">Vacuum</option>}
            {label === "shear" && <option value="fluid">Fluid</option>}
          </select>
        </div>
      )}

      <WaveProps property={property} onChange={handleEdit} label={label} />
      <ModulusProps property={property} onChange={handleEdit} label={label} />

      {(disable || property.type === "vacuum") && (
        <>
          <p>Vacuums do not support compression or shear waves.</p>
          <p>They are pure reflective layers that shift phase 180°.</p>
        </>
      )}
      {!disable && property.type === "fluid" && (
        <p>Fluids do not support shear waves.</p>
      )}
    </div>
  );
}

interface iTypeProps {
  property: iProperty;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  label: string;
}

function WaveProps({ property, onChange, label }: iTypeProps) {
  if (property.type === "wave") {
    return (
      <div>
        <label htmlFor={`${label}-wave-speed`}>Wave Speed (m/s)</label>
        <input
          id={`${label}-wave-speed`}
          name={`${label}-wave-speed`}
          type="number"
          onChange={onChange}
          min="0"
          step="any"
          value={property.waveSpeed}
        />
        <label htmlFor={`${label}-attenuation`}>Attenuation (db/m)</label>
        <input
          id={`${label}-attenuation`}
          name={`${label}-attenuation`}
          type="number"
          step="any"
          onChange={onChange}
          value={property.attenuation}
        />
      </div>
    );
  } else {
    return <></>;
  }
}

function ModulusProps({ property, onChange, label }: iTypeProps) {
  if (property.type === "modulus") {
    return (
      <div>
        <label htmlFor={`${label}-real`}>Real (Pa)</label>
        <input
          id={`${label}-real`}
          name={`${label}-real`}
          onChange={onChange}
          value={property.real}
        />
        <label htmlFor={`${label}-imag`}>Imaginary (Pa)</label>
        <input
          id={`${label}-imag`}
          name={`${label}-imag`}
          onChange={onChange}
          value={property.imag}
        />
      </div>
    );
  } else {
    return <></>;
  }
}
