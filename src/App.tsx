import React, { useState } from 'react';
import { CircleUserRound, FileSpreadsheet, Flower as GitFlow, AlertTriangle } from 'lucide-react';
// import CadastroBasico from './components/CadastroBasico';
// import Sipoc from './components/Sipoc';
import Fluxograma from './components/Fluxograma';
// import RiscosOportunidades from './components/RiscosOportunidades';

function App() {
  const [activeStep, setActiveStep] = useState(3); // Definindo o Fluxograma como ativo

  const steps = [
    // { number: 1, title: 'Cadastro Básico', icon: CircleUserRound },
    // { number: 2, title: 'SIPOC', icon: FileSpreadsheet },
    { number: 3, title: 'Fluxograma', icon: GitFlow },
    // { number: 4, title: 'Riscos e Oportunidades', icon: AlertTriangle },
  ];

  const renderStep = () => {
    switch (activeStep) {
      // case 1:
      //   return <CadastroBasico />;
      // case 2:
      //   return <Sipoc />;
      case 3:
        return <Fluxograma />;
      // case 4:
      //   return <RiscosOportunidades />;
      default:
        return <Fluxograma />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Steps */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center py-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`flex flex-col items-center space-y-2 group ${
                    activeStep === step.number
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep === step.number
                        ? 'bg-blue-100'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;