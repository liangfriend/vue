<template>
  <div>
    <el-input v-model="prompt"></el-input>
    <el-button @click="sendMessage(prompt)">发送消息</el-button>
    <el-button @click="stopSpeak">停止播放</el-button>
    <el-button @click="speakingAndSend">说话</el-button>
    <div style="white-space: pre-wrap; margin-top: 10px;" v-html="message"></div>
  </div>
</template>
<script setup lang="ts">

import {api} from "@/utils/api.ts";
import {Ref, ref} from "vue";
import {speaker} from "@/utils/speaker.ts";
import {listener} from "@/utils/listener.ts";
import {extractText} from "@/utils/stringUtil.ts";

interface HistoryItem {
  role: string,
  content: string
}

const modelName = 'deepseek-r1:14b'
const prompt = ref('以后的回答保持在10个字以内')
const message = ref('')  // 用于展示输出的响应内容
const history: Ref<HistoryItem[]> = ref([])

async function sendMessage(text: string) {
  message.value = ''; // 清空旧内容
  history.value.push({role: "user", content: text})
  const reqBody = {
    model: modelName,
    messages: history.value,
    stream: true,
    options: {
      temperature: 0.7,
      max_tokens: 100
    }
  };

  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  });

  if (!response.body) {
    console.error('No response body!');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const {value, done} = await reader.read();

    if (done) break;
    const chunk = decoder.decode(value, {stream: true});
    message.value += JSON.parse(chunk).message.content

  }
  history.value.push({role: "assistant", content: message.value})
  const pureMsg = extractText(message.value)
  speaker.initSpeaker({text: pureMsg, rate: 2})
  speaker.speak()
}

function stopSpeak() {
  speaker.stop()
}

function speakingAndSend() {
  listener.start((spoken) => {
    if (spoken) {
      sendMessage(spoken)
    }
  })
}

</script>

<style scoped>

</style>