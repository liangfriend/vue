<script setup lang="ts">

</script>

<template>
  <div class="drawing-lyrics-show-container">
    <div class="music-score">
      <div class="scroll-container hide-scrollbar"></div>
    </div>
    <div class="operation">
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/changci.svg"/>
        </div>
        <div class="text">
          试听
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/changci.svg"/>
        </div>
        <div class="text">
          暂停
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/changci.svg"/>
        </div>
        <div class="text">
          停止
        </div>
      </div>
      <div class="btn ">
        <div class="circle">
          <img src="../assets/icons/changci.svg"/>
        </div>
        <div class="text">
          循环
        </div>
      </div>
      <div class="split-line"></div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/melody.svg"/>
        </div>
        <div class="text">
          旋律
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/changming.svg"/>
        </div>
        <div class="text">
          唱名
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/changci.svg"/>
        </div>
        <div class="text">
          唱词
        </div>
      </div>
      <div class="split-line"></div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/jianpu.svg"/>
        </div>
        <div class="text">
          简谱
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/xianpu.svg"/>
        </div>
        <div class="text">
          五线谱
        </div>
      </div>
      <div class="split-line"></div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/restart.svg"/>
        </div>
        <div class="text">
          重新绘制
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/export_local.svg"/>
        </div>
        <div class="text">
          导出本地
        </div>
      </div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/save_cloud.svg"/>
        </div>
        <div class="text">
          保存云端
        </div>
      </div>
      <div class="split-line"></div>
      <div class="btn">
        <div class="circle">
          <img src="../assets/icons/teaching.svg"/>
        </div>
        <div class="text">
          进入授课
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawing-lyrics-show-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(0deg, #E2E4F5 0%, rgba(255, 255, 255, 0) 100%);

  .music-score {
    margin-top: 40px;
    height: 100%;
    width: calc(100% - 80px);
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 18px 18px 18px 18px;
    border: 1px solid #EAEAEA;

    .scroll-container {
      width: 100%;
      height: 100%;
      overflow: scroll;
    }

    .tips {
      height: 56px;
    }
  }

  .operation {
    height: 131px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    gap: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .circle {
        width: 52px;
        height: 52px;
        border-radius: 26px;
        background: rgba(0, 0, 0, 0.04);
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
        }
      }

      .text {
        text-align: center;
        font-size: 16px;
        color: #333;
      }
    }

    .split-line {
      width: 0px;
      height: 64px;
      border-radius: 0px 0px 0px 0px;
      border: 1px solid rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome */
}
</style>