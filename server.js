import express from "express";
import dotenv from "dotenv";
import RunwayML from "@runwayml/sdk";

dotenv.config();
const app = express();
app.use(express.json({limit:"1mb"}));
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

if (!process.env.RUNWAYML_API_SECRET) {
  console.warn("RUNWAYML_API_SECRET não configurada.");
}
const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });

app.post("/api/generate-video", async (req,res)=>{
  try {
    const {prompt, style, ratio} = req.body || {};
    if(!prompt) return res.status(400).json({error:"Prompt vazio."});
    const finalPrompt = `${style || "3D infantil colorido e educativo"}. ${prompt}. Conteúdo apropriado para crianças, personagens fofos, expressões alegres, cenário seguro, visual educativo e colorido.`;
    const task = await client.imageToVideo.create({
      model: "gen4.5",
      promptText: finalPrompt,
      ratio: ratio === "720:1280" ? "720:1280" : "1280:720",
      duration: 5
    });
    res.json({id: task.id});
  } catch(e) {
    console.error(e);
    res.status(500).json({error:"Não foi possível iniciar a geração. Verifica a chave Runway e os créditos."});
  }
});

app.get("/api/video/:id", async (req,res)=>{
  try {
    const task = await client.tasks.retrieve(req.params.id);
    let url = null;
    if(task.status === "SUCCEEDED" && task.output) url = task.output[0];
    res.json({status:task.status,url});
  } catch(e) {
    console.error(e);
    res.status(500).json({error:"Erro ao consultar a tarefa."});
  }
});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`KidsVideo AI: http://localhost:${port}`));
