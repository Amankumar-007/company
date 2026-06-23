import React, { useState, useEffect } from 'react';

const ProjectTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredTask, setHoveredTask] = useState(null);

  const timelineData = {
    title: "Project Timeline",
    description: "At TwoflowW, we value your time and understand the urgency of roofing issues. That's why we've streamlined our project timeline.",
    stages: [
      {
        name: "Discovery Stage",
        duration: "1 month",
        tasks: [
          { name: "Market & competitor analysis", step: 1 },
          { name: "Project scope & tech stack", step: 2 },
          { name: "Timeline & resource planning", step: 3 },
          { name: "Wireframes & user flows", step: 4 }
        ]
      },
      {
        name: "UX/UI Design",
        duration: "3 months",
        tasks: [
          { name: "Visual exploration & Branding", step: 1 },
          { name: "UI Design", step: 2, highlighted: true }
        ]
      },
      {
        name: "Development",
        duration: "6 months",
        tasks: [
          { name: "Front-end development", step: 1, active: true },
          { name: "Back-end development & Third-party services setup", step: 2 }
        ]
      },
      {
        name: "Testing & Optimization",
        duration: "4 months",
        tasks: [
          { name: "Test and validate with users", step: 1 }
        ]
      },
      {
        name: "Deploy",
        duration: "2 months",
        tasks: [
          { name: "Production deployment", step: 1 },
          { name: "Performance monitoring", step: 2 },
          { name: "Go-live support", step: 3 }
        ]
      }
    ],
    timelineScale: "stages",
    totalDuration: "16 months"
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
            <div className="flex-1">
              <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                {timelineData.title}
              </h1>
            </div>
            <div className="flex-1 lg:max-w-md lg:text-right">
              <p className="text-gray-600 text-base leading-relaxed">
                {timelineData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Main Timeline Structure - Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 gap-4 lg:gap-8 relative">

              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-10"></div>

            {timelineData.stages.map((stage, stageIndex) => (
              <div
                key={stageIndex}
                className={`relative transition-all duration-300 cursor-pointer group ${stageIndex % 2 === 1 ? 'mt-32' : ''
                  }`}
                onMouseEnter={() => setActiveStage(stageIndex)}
              >

                {/* Stage Circle */}
                <div className="relative flex justify-center mb-6">
                  <div className={`
                    w-4 h-4 rounded-full border-2 z-20 transition-all duration-300 transform group-hover:scale-125
                    ${stageIndex <= activeStage
                      ? 'bg-black border-black shadow-lg'
                      : 'bg-white border-gray-300'
                    }
                  `}>
                    {stageIndex <= activeStage && (
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-black opacity-20 animate-ping"></div>
                    )}
                  </div>

                  {/* Connecting Line for alternating layout */}
                  {stageIndex % 2 === 1 && (
                    <div className="absolute top-0 left-1/2 w-0.5 h-32 bg-gray-200 transform -translate-x-0.5 -translate-y-32"></div>
                  )}
                </div>

                {/* Stage Content */}
                <div className="space-y-4">

                  {/* Stage Title */}
                  <div className="text-center lg:text-left">
                    <h2 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                      {stage.name}
                    </h2>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3">
                    {stage.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className={`
                          p-3 rounded-lg border transition-all duration-300 transform hover:shadow-md hover:-translate-y-0.5
                          ${task.highlighted
                            ? 'bg-orange-50 border-orange-200 text-orange-700'
                            : task.active
                              ? 'bg-gray-50 border-gray-200 text-black shadow-sm relative'
                              : 'bg-gray-50 border-gray-200 text-gray-700'
                          }
                          ${stageIndex <= activeStage ? 'opacity-100' : 'opacity-60'}
                        `}
                        onMouseEnter={() => setHoveredTask(`${stageIndex}-${taskIndex}`)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        {task.active && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                        )}

                        <p className="text-sm font-medium leading-tight">
                          {task.name}
                        </p>

                        {/* Task Step Info */}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-full border">
                            Step {task.step}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duration Labels */}
            <div className="grid grid-cols-5 gap-4 lg:gap-8 mt-12">
              {timelineData.stages.map((stage, index) => (
                <div key={index} className="text-center">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    {stage.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline Structure */}
          <div className="md:hidden relative border-l-2 border-gray-200 ml-4 my-8">
            {timelineData.stages.map((stage, stageIndex) => (
              <div key={stageIndex} className="relative pl-8 pb-10 last:pb-0" onClick={() => setActiveStage(stageIndex)}>
                {/* Stage Circle */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 z-20 transition-colors duration-300 ${stageIndex <= activeStage ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                  {stageIndex <= activeStage && (
                    <div className="absolute inset-0 w-full h-full rounded-full bg-black opacity-20 animate-ping"></div>
                  )}
                </div>
                
                {/* Stage Content */}
                <div className="-mt-1.5">
                  <h2 className="text-xl font-bold text-black mb-2">{stage.name}</h2>
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{stage.duration}</span>
                  </div>
                  
                  {/* Tasks */}
                  <div className="space-y-3">
                    {stage.tasks.map((task, taskIndex) => (
                      <div 
                        key={taskIndex} 
                        className={`p-3 rounded-lg border transition-all duration-300 ${task.highlighted ? 'bg-orange-50 border-orange-200 text-orange-700' : task.active ? 'bg-gray-50 border-gray-200 text-black shadow-sm relative' : 'bg-gray-50 border-gray-200 text-gray-700'} ${stageIndex <= activeStage ? 'opacity-100' : 'opacity-60'}`}
                      >
                        {task.active && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                        )}
                        <p className="text-sm font-medium leading-tight">{task.name}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded-full border">Step {task.step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16">
          <div className="flex justify-center space-x-3 mb-8">
            {timelineData.stages.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to stage ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${index <= activeStage ? 'bg-black' : 'bg-gray-300'
                  }`}
                onClick={() => setActiveStage(index)}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-1000 ease-out"
              style={{
                width: `${((activeStage + 1) / timelineData.stages.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">

          <p className="mt-4 text-sm text-gray-500">
            • Hover to explore {timelineData.timelineScale}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProjectTimeline;