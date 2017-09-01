<template>
  <div class="pagination">
    <span class="pagination__total" :loading="loading">{{ totalText }}</span>
    <a class="pagination-btn pagination__first"
      title="列表首页"
      :disabled="loading || innerCurrent < 2"
      @click="jump(1)"></a>
    <a class="pagination-btn pagination__prev"
      title="上一页"
      :disabled="loading || innerCurrent < 2"
      @click="jump(innerCurrent - 1)"></a>
    <span class="pagination__jump">
      <PositiveIntegerInput
        autocomplete="off"
        :disabled="loading || total < 1"
        :max="pageCount"
        :value="innerCurrent"
        @on-enter="jump"
        ></PositiveIntegerInput>&nbsp;页,共&nbsp;{{ pageCount }}&nbsp;页
    </span>
    <a class="pagination-btn pagination__next"
      title="下一页"
      :disabled="loading || innerCurrent >= pageCount"
      @click="jump(innerCurrent + 1)"></a>
    <a class="pagination-btn pagination__refresh"
      title="刷新当前页"
      :disabled="loading"
      @click="jump(innerCurrent)">刷新</a>
  </div>
</template>

<script>
  import PositiveIntegerInput from './positive-integer-input'

  export default {
    name: 'Pagination',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      size: {
        type: [Number, String],
        default: 50
      },
      total: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        innerCurrent: 1,
        innerSize: 50
      }
    },
    watch: {
      current: {
        immediate: true,
        handler (val) {
          this.innerCurrent = val
        }
      },
      size: {
        immediate: true,
        handler (val) {
          this.innerSize = val
        }
      },
    },
    computed: {
      pageCount () {
        return Math.ceil(this.total / this.innerSize)
      },
      totalText () {
        if (this.loading) {
          return ''
        } else if (!this.total) {
          return '未找到'
        } else {
          let start = Math.max(0, (this.innerCurrent - 1) * this.innerSize + 1)
          let end = Math.min(this.innerCurrent * this.innerSize, this.total)
          return `${start}-${end} / ${this.total}`
        }
      },
      internalPageCount () {
        if (typeof this.total === 'number') {
          return Math.ceil(this.total / this.internalPageSize)
        } else if (typeof this.pageCount === 'number') {
          return this.pageCount
        }
        return null
      },
    },
    methods: {
      first (e) {
        this.jump(1)
      },
      prev (e) {
        this.jump(this.innerCurrent - 1)
      },
      next (e) {
        this.jump(this.innerCurrent + 1)
      },
      refresh () {
        this.jump(this.innerCurrent)
      },
      jump (n) {
        if (n >= 1 && n <= this.pageCount) {
          this.innerCurrent = n
          this.$emit('jump', n)
        }
      },
    },
    components: { PositiveIntegerInput }
  }
</script>

<style lang="less">
  .pagination {
    font-size: 0;
    line-height: 0;

    [disabled] {
      opacity: .3;
    }

    >span, >a {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      line-height: 21px;
    }


    &__total {
      margin-right: 1em;

      &[loading] {
        opacity: 1;
        width: 16px;
        height: 16px;
        background: transparent url(~@assets/svg/loading-spinning.svg) no-repeat;
        background-size: cover;
      }
    }

    &-btn {
      height: 1.5em;
      line-height: 1.5em;
      width: 16px;
      background: transparent url(~@assets/svg/pagination-sprite.svg) no-repeat;
      cursor: pointer;
      user-select: none;

      &.pagination__first {
        background-position: -47px 0;
        margin-right: 5px;
      }
      &.pagination__prev {
        background-position: -4px 0;
        margin-right: 5px;
      }
      &.pagination__next {
        background-position: -24px 0;
        margin-left: 5px;
      }
      &.pagination__refresh {
        background-position: -69px 0;
        margin-left: 5px;
        padding-left: 16px;
        width: auto;
      }

      [disabled] {
        cursor: default;
        opacity: .3;
        color: #0E5099;
      }
    }
  }
</style>
