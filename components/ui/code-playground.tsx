"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Copy, Download, Code2 } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-button"
import { LiquidLoader } from "@/components/ui/liquid-loader"

const codeExamples = {
  javascript: {
    name: "JavaScript",
    code: `// Interactive Todo App
class TodoApp {
  constructor() {
    this.todos = [];
    this.render();
  }
  
  addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false
    };
    this.todos.push(todo);
    this.render();
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }
  
  render() {
    console.log('📝 Current Todos:');
    this.todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⏳';
      console.log(\`\${status} \${todo.text}\`);
    });
  }
}

// Try it out!
const app = new TodoApp();
app.addTodo('Learn React');
app.addTodo('Build a project');
app.toggleTodo(app.todos[0].id);`,
    output: `📝 Current Todos:
✅ Learn React
⏳ Build a project`,
  },
  python: {
    name: "Python",
    code: `# Data Analysis with Python
import pandas as pd
import numpy as np

# Sample student performance data
data = {
    'student': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'math': [95, 87, 92, 88],
    'science': [89, 94, 85, 91],
    'english': [92, 83, 89, 94]
}

df = pd.DataFrame(data)

# Calculate average scores
df['average'] = df[['math', 'science', 'english']].mean(axis=1)

# Find top performer
top_student = df.loc[df['average'].idxmax()]

print("📊 Student Performance Analysis")
print("=" * 30)
print(df.to_string(index=False))
print(f"\\n🏆 Top Performer: {top_student['student']}")
print(f"📈 Average Score: {top_student['average']:.1f}")`,
    output: `📊 Student Performance Analysis
==============================
  student  math  science  english  average
    Alice    95       89       92     92.0
      Bob    87       94       83     88.0
  Charlie    92       85       89     88.7
    Diana    88       91       94     91.0

🏆 Top Performer: Alice
📈 Average Score: 92.0`,
  },
  sql: {
    name: "SQL",
    code: `-- E-commerce Analytics Query
SELECT 
    p.category,
    COUNT(o.order_id) as total_orders,
    SUM(o.amount) as total_revenue,
    AVG(o.amount) as avg_order_value,
    RANK() OVER (ORDER BY SUM(o.amount) DESC) as revenue_rank
FROM products p
JOIN orders o ON p.product_id = o.product_id
WHERE o.order_date >= '2024-01-01'
GROUP BY p.category
HAVING COUNT(o.order_id) > 10
ORDER BY total_revenue DESC;

-- Sample Results:
-- category     | total_orders | total_revenue | avg_order_value | revenue_rank
-- Electronics  |     156      |    $45,230    |     $290.06     |      1
-- Clothing     |     203      |    $38,940    |     $191.82     |      2
-- Books        |     89       |    $12,450    |     $139.89     |      3`,
    output: `Query executed successfully!

Results:
category     | total_orders | total_revenue | avg_order_value | revenue_rank
Electronics  |     156      |    $45,230    |     $290.06     |      1
Clothing     |     203      |    $38,940    |     $191.82     |      2
Books        |     89       |    $12,450    |     $139.89     |      3

💡 Insights:
- Electronics has highest revenue despite fewer orders
- Clothing has most orders but lower average value
- Books category shows potential for growth`,
  },
}

export function CodePlayground() {
  const [activeTab, setActiveTab] = useState("javascript")
  const [isRunning, setIsRunning] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const runCode = async () => {
    setIsRunning(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setShowOutput(true)
    setIsRunning(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab as keyof typeof codeExamples].code)
  }

  return (
    <Card className="bg-white/5 dark:bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code2 className="h-6 w-6 text-blue-400" />
          Interactive Code Playground
        </CardTitle>
        <p className="text-gray-300">Try out code examples from our programs</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            {Object.entries(codeExamples).map(([key, example]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 text-white"
              >
                {example.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(codeExamples).map(([key, example]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="space-y-4">
                {/* Code Editor */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {example.name}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={copyCode} className="text-gray-400 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300 whitespace-pre-wrap">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Run Button */}
                <div className="flex justify-center">
                  <LiquidButton
                    onClick={runCode}
                    disabled={isRunning}
                    variant="primary"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isRunning ? <LiquidLoader size="sm" color="green" /> : <Play className="h-4 w-4 mr-2" />}
                    {isRunning ? "Running..." : "Run Code"}
                  </LiquidButton>
                </div>

                {/* Output */}
                {showOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gray-800 rounded-lg p-4 border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 font-medium">Output</span>
                      </div>
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{example.output}</pre>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
