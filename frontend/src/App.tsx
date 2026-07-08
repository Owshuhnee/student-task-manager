import './App.css'

function App() {
  
     return (
       <div className="min-h-screen flex items-center justify-center">
         <h1 className="text-3xl font-bold text-blue-600">Fander Task Manager</h1>
         fetch('http://127.0.0.1:5000')
       </div>
     )
   }
   export default App