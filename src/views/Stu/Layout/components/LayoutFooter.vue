<script setup></script>

<template>
  <div class="ptsc-page-footer">
    <div class="container">
      <div class="footer-first-line">
        <ul>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">关于我们</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">合作伙伴</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">隐私条款</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">友情链接</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">联系我们</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">违法和不良信息举报</span>
            </RouterLink>
          </li>
          <span class="sparate-line">|</span>
          <li>
            <RouterLink to="/">
              <span class="first-line-word">帮助指南</span>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div style="height: 100%; color: #fff"><br />---------------页脚-----------------</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ptsc-page-footer {
  height: 240px;
  background-color: #313438;

  .container {
    flex-direction: column;
    align-items: start;

    .footer-first-line ul {
      display: flex;
      margin: 10px 0;

      li {
        margin-right: 10px;
      }
    }

    .sparate-line {
      color: gray;
      font-size: 16px;
      margin-right: 10px;
    }

    .first-line-word {
      color: gray;
      font-size: 16px;
    }

    .first-line-word:hover {
      color: $ptscCColor;
    }
  }
}
</style>
