import Replicate from "replicate";

export const runModel = async (req,res) => {

    const {prompt} = req.body

    const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    });

    //MODEL 1
    //DEF  - LLM model that generate response based on human understandable language


    // const output = await replicate.run(
    //     "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
    //     {
    //       input: {
    //         debug: false,
    //         top_k: 50,
    //         top_p: 1,
    //         prompt: prompt,
    //         temperature: 0.5,
    //         system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
    //         max_new_tokens: 500,
    //         min_new_tokens: -1
    //       }
    //     }
    //   );
    //   console.log(output , ' fghjk');


    //   const poemArray = output;
      
    //   const poemText = poemArray.join('');
    //   console.log(poemText , ' ghjkl;');
    //   res.status(200).json(poemText)


    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          width: 768,
          height: 768,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      }
    );
    console.log(output);
    res.status(200).send(output[0])
}




// "Can you write a poem about open source machine learning? Let's make it in the style of E. E. Cummings."
