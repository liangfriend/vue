<template>
  <div class="poem-page">
    <div class="poem-list-wrapper">
      <div class="poem-list">
        <div class="poem-item" v-for="item in poems" :key="item.name" @click="goToEdit(item)">
          <div class="poem-card">
            <div class="poem-content">
              <div class="poem-title">{{ item.name }}</div>
              <div class="poem-lyrics">
                <div v-for="(line, idx) in item.lyrics" :key="idx">{{ line }}</div>
              </div>
            </div>
          </div>
          <div class="poem-meta">
            <div class="poem-name">{{ item.name }}</div>
            <div class="poem-author">{{ item.author }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="operation">
      <el-button>首页</el-button>
      <el-button>返回</el-button>
      <el-button>最小化</el-button>
    </div>
  </div>
</template>
<script>
import {getPoems} from '@/applications/testApplication/api.ts';

export default {
  data() {
    return {
      poems: [],
    };
  },
  async mounted() {
    const res = await getPoems();
    if (res.data) {
      this.poems = res.data;
    }
  },
  methods: {
    goToEdit(item) {
      this.$router.push({path: `/test/edit`, query: {...item}});
    },
  },
};

</script>
<style scoped lang="scss">
.poem-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eff0ff;
}

.poem-list-wrapper {
  flex: 1;
  margin: 24px 32px 0 32px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(34, 34, 34, 0.06);
  overflow: hidden;
}

.poem-list {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(12px, 2vw, 28px);
  row-gap: clamp(18px, 2vw, 32px);
  justify-content: space-between; /* 每行首列靠左，末列靠右，中间平均分布 */
  align-content: flex-start;
  padding: 0;
  overflow-y: auto;
}

/* 占位，避免最后一行被拉伸到两侧过大间距 */
.poem-list::after {
  content: '';
  flex: 0 0 215px;
}

.poem-item {
  width: 215px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &:hover .poem-card {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border: 1px dashed #cfd2d9;
  }

  &:hover .poem-name,
  &:hover .poem-author {
    color: #ff4d6a;
  }
}

.poem-card {
  position: relative;
  width: 100%;
  height: 260px;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #ebecef;
  box-shadow: 0 8px 18px rgba(34, 34, 34, 0.08);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('../assets/bg-poem.png') no-repeat center center;
    background-size: cover;
    opacity: 0.95;
  }
}

.poem-content {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 22px 20px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #828586;
  font-size: 14px;
  line-height: 24px;
}

.poem-title {
  font-size: 16px;
  font-weight: 600;
  color: #9fa1a3;
  margin-bottom: 16px;
}

.poem-lyrics {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.poem-meta {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.poem-name {
  color: #1f1f1f;
  font-weight: 600;
}

.poem-author {
  color: #1f1f1f;
}

.operation {
  padding: 12px 32px 24px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
}
</style>
