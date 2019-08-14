
<script>
import rendertest2 from "./renderTest2";
export default {
  name: "rendertest",
  data: function() {
    return {
      renderData: 1
    };
  },
  render: function(createElement) {
    return createElement(
      "h2",
      {
        style: {
          color: "red"
        },
        domProps: {
          innerHTML: "baz"
        }
      },
      [
        createElement(rendertest2, {
          attrs: {
            id: "foo"
          },
          style: {
            color: "red",
            fontSize: "14px"
          },
          props: {
            myProp: "bar"
          },
          on: {
            click: function() {
              console.log("parentRender");
            }
          }
        })
      ]
    );
  },
  components: {
    rendertest2
  }
};
</script>

