import React from "react";
import { Image as ImageIcon } from "lucide-react";
import ImageUploadField from "../ImageUploadField";

const ImageMediaSection = ({ SettingsSection, setImageFile, uploading, register, watch, errors, setValue, country }) => {

    const flagFile = watch("flagImage");
    const countryFile = watch("countryImage");

    register("flagImage", {
        validate: (value) => {
            if (value?.[0] && !value[0].type.match(/image\/(png|jpeg|jpg)/)) return "Only PNG, JPG, JPEG allowed";
            if (value?.[0] && value[0].size > 1 * 1024 * 1024) return "Max size 1 MB";
            return true;
        }
    });

    register("countryImage", {
        validate: (value) => {
            if (!value?.[0] && !country?.image_url) return "Country image is required";
            if (value?.[0] && !value[0].type.match(/image\/(png|jpeg|jpg)/)) return "Only PNG, JPG, JPEG allowed";
            if (value?.[0] && value[0].size > 2 * 1024 * 1024) return "Max size 2 MB";
            return true;
        }
    });

    return (
        <SettingsSection title="Images & Media" description="Upload images" icon={ImageIcon}>

            {/* FLAG IMAGE */}
            <ImageUploadField
                label="Flag Image"
                id="flagImage"
                helper="Upload an image (recommended: 320x240px)"
                onImageSelect={(file) => {
                    setValue("flagImage", file ? [file] : []);
                    setImageFile(file);
                }}
                preview={
                    flagFile?.[0]
                        ? URL.createObjectURL(flagFile[0])
                        : country?.flag_url || null
                }
                uploading={uploading}
                error={errors.flagImage?.message}
            />
            {errors.flagImage && <p className="mt-1 text-xs text-red-400">{errors.flagImage.message}</p>}

            {/* COUNTRY IMAGE */}
            <ImageUploadField
                label="Country Image"
                id="countryImage"
                helper="Upload an image (recommended: 800x600px)"
                onImageSelect={(file) => {
                    setValue("countryImage", file ? [file] : []);
                    setImageFile(file);
                }}
                preview={
                    countryFile?.[0]
                        ? URL.createObjectURL(countryFile[0])
                        : country?.image_url || null
                }
                uploading={uploading}
                error={errors.countryImage?.message}
            />
            {errors.countryImage && <p className="mt-1 text-xs text-red-400">{errors.countryImage.message}</p>}

        </SettingsSection>
    );
};

export default ImageMediaSection;
