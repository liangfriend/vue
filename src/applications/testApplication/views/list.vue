<template>
  <div class="poem-page">
    <div class="poem-list-wrapper">
      <div class="poem-list hide-scrollbar" ref="poemList">
        <div class="poem-item" v-for="item in poems" :key="item.name" @click="goToEdit(item)">
          <div class="poem-card">
            <div class="poem-content">
              <div class="poem-title">{{ item.name }}</div>
              <div class="poem-subtitle">{{ item.name }}</div>
              <div class="poem-lyrics">
                <div v-for="(line, idx) in filteredPoems(item.lyrics)" :key="idx">{{ line }}</div>
              </div>
            </div>
          </div>
          <div class="poem-meta">
            <div class="poem-name">《{{ item.name }}》</div>
            <div class="poem-author">{{ item.author }}</div>
          </div>
        </div>
        <div
            v-for="n in placeholderCount"
            :key="'placeholder-'+n"
            class="poem-item placeholder">
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
      placeholderCount: 0,
      maxCharsPerLine: 10,
      charWidthEstimate: 14,
    };
  },
  computed: {},
  async mounted() {
    const res = await getPoems();
    if (res.data) {
      this.poems = res.data;
      this.$nextTick(() => {
        this.measureGrid();
        this.measureCharCapacity();
      });
    }
    window.addEventListener('resize', this.measureGrid);
    window.addEventListener('resize', this.measureCharCapacity);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.measureGrid);
    window.removeEventListener('resize', this.measureCharCapacity);
  },
  methods: {
    filteredPoems(lyrics) {
      const lines = lyrics || [];
      const out = [];
      const limit = Math.max(4, this.maxCharsPerLine || 10);

      const truncateLine = (line) => {
        if (!line) {
          return '';
        }
        if (line.length <= limit) {
          return line;
        }
        return line.slice(0, Math.max(0, limit - 3)) + '...';
      };

      for (let i = 0; i < lines.length && out.length < 6; i++) {
        if (i === 5 && lines.length > 6) {
          out.push('......');
          break;
        }
        out.push(truncateLine(lines[i]));
      }

      return out;
    },
    goToEdit(item) {
      this.$router.push({path: `/test/edit`, query: {...item}});
    },
    // 关键部分，计算出还差几个列没有填满
    measureGrid() {
      const el = this.$refs.poemList;
      if (!el) return;

      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      const width = el.clientWidth;
      const itemWidth = 215;
      const cols = Math.max(1, Math.floor((width + gap) / (itemWidth + gap)));
      const remainder = this.poems.length % cols;
      this.placeholderCount = remainder === 0 ? 0 : cols - remainder;
    },
    measureCharCapacity() {
      const el = this.$refs.poemList;
      if (!el) {
        return;
      }
      const firstCard = el.querySelector('.poem-content');
      if (!firstCard) {
        return;
      }
      const styles = window.getComputedStyle(firstCard);
      const paddingLeft = parseFloat(styles.paddingLeft || '0');
      const paddingRight = parseFloat(styles.paddingRight || '0');
      const contentWidth = firstCard.clientWidth - paddingLeft - paddingRight;
      const maxChars = Math.max(4, Math.floor(contentWidth / this.charWidthEstimate));
      this.maxCharsPerLine = maxChars;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 215px));
  column-gap: clamp(12px, 2vw, 28px);
  row-gap: clamp(18px, 2vw, 32px);
  justify-content: center; /* 行内居中，最后一行间距保持一致 */
  align-content: flex-start;
  padding: 0;
  overflow-y: auto;
}

.poem-item {
  width: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;


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
  font-size: 14px;
  font-weight: 600;
  color: #9fa1a3;
}

.poem-subtitle {
  color: #8a847e;
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.poem-lyrics {
  display: flex;
  flex-direction: column;
  gap: 6px;

}

.poem-meta {
  position: absolute;
  height: 0;
  bottom: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
}

.poem-name {
  color: #333;
  font-weight: 600;
  font-size: 18px;
}

.poem-author {
  color: #666;
  font-size: 14px;
}

.operation {
  padding: 12px 32px 24px;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome */
}
</style>
