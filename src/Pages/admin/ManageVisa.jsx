import React from "react";
import { FileCog} from "lucide-react";

const VisaManage = () => {
  return (
    <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center">
      {/* Icon Group */}
      <div className="flex items-center gap-3 mb-4 text-gray-400">
        <FileCog className="w-10 h-10 animate-pulse" />
       
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-semibold text-gray-500 tracking-wide">
        Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 mt-2 text-lg">
        This feature is currently under development
      </p>
    </section>
  );
};

export default VisaManage;
