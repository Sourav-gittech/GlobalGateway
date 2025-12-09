import { X } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';

const CountryFormModal = ({ isOpen, onClose, country, onSave }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: country || {
            id: null,
            name: "",
            code: "",
            official_name: "",
            continent: "",
            region: "",
            capital: "",
            flag_url: "",
            image_url: "",
            area: "",
            population: "",
            currency: "",
            language: "",
            visa_required: false,
            is_active: true,
            overview: "",
            description: "",
            available_visas: "",
        },
    });

    const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  helper,
  error,
  rows,
  maxLength,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-2"
    >
      {label}
    </label>

    {type === "textarea" ? (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        className={`w-full px-4 py-2.5 bg-slate-700/30 border ${error ? "border-red-500/50" : "border-slate-600/50"
          } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none`}
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register}
        className={`w-full px-4 py-2.5 bg-slate-700/30 border ${error ? "border-red-500/50" : "border-slate-600/50"
          } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm`}
      />
    )}

    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
    {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
  </div>
);

    React.useEffect(() => {
        reset(country || {});
    }, [country, reset]);

    const submit = (data) => {
        if (!data.id) data.id = Date.now();
        onSave(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-800/50" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-slate-800/80 border border-slate-700/60 rounded-lg p-6 z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                        {country ? "Edit Country" : "Add Country"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-slate-700/40 text-slate-300"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(submit)} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormField
                            label="Name"
                            id="name"
                            placeholder="Country name"
                            register={register("name")}
                        />
                        <FormField
                            label="Code"
                            id="code"
                            placeholder="ISO code"
                            register={register("code")}
                        />
                        <FormField
                            label="Official Name"
                            id="official_name"
                            placeholder="Official Country Name"
                            register={register("official_name")}
                        />
                        <FormField
                            label="Continent"
                            id="continent"
                            placeholder="Continent"
                            register={register("continent")}
                        />
                        <FormField
                            label="Capital"
                            id="capital"
                            placeholder="Capital city"
                            register={register("capital")}
                        />
                        <FormField
                            label="Currency"
                            id="currency"
                            placeholder="Currency"
                            register={register("currency")}
                        />
                        <FormField
                            label="Flag URL"
                            id="flag_url"
                            placeholder="https://..."
                            register={register("flag_url")}
                        />
                        <FormField
                            label="Cover Image URL"
                            id="image_url"
                            placeholder="https://..."
                            register={register("image_url")}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 rounded-lg bg-slate-700/40 text-slate-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CountryFormModal