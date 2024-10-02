import { reactive } from 'vue';

const ulDropDownListStore = reactive({
      createID: (() => {
            let i = -1;
            return () => ++i;
      })(),
      data: [] as boolean[]
});

export default ulDropDownListStore;
