import React from "react";
import ProblemPanel from "@/components/sections/weekly-challenges/solve_page/ProblemPanel";
// import RunButton from "@/components/sections/weekly-challenges/solve_page/RunButton";
// import SubmitButton from "@/components/sections/weekly-challenges/solve_page/SubmitButton";

interface PageProps {
  params: {
    problemId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { problemId } = params;

  return (
    <div className="flex h-screen">
      <ProblemPanel problemId={problemId} />

      {/* Right side (editor + actions) */}
      <div className="flex flex-col flex-1">
        {/* Code Editor goes here */}

        <div className="flex gap-4 p-4">
          {/* <RunButton problemId={problemId} />
          <SubmitButton problemId={problemId} /> */}
        </div>
        
      </div>
    </div>
  );
};

export default Page;