import Vue from "vue";
import lang from "element-ui/lib/locale/lang/ru-RU";
import locale from "element-ui/lib/locale";
import {Button, Card, Form, FormItem, Input, Select, Option, Alert, Checkbox, Switch, Row, Col} from "element-ui";

const elements = [Button, Card, Form, FormItem, Input, Select, Option, Alert, Checkbox, Switch, Row, Col];

locale.use(lang);

elements.forEach(el => Vue.use(el, {locale}));
