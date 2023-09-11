# React-ellipsis-component

A high performance and customized ellipsis component for react. Support to custom ellipsis char, custom ellipsis node, end char filter, rich text, ...etc.

Searching for a Vue library? Refer to [vue-ellipsis-component](https://github.com/ruofee/vue-ellipsis-component).

![](https://img.shields.io/npm/v/react-ellipsis-component.svg) ![](https://img.shields.io/npm/dt/react-ellipsis-component.svg) ![](https://img.shields.io/badge/language-javascript-yellow.svg)

![demo](https://static.quincychen.cn/demo.gif)

## API Referrer

### Props

| Prop Name               | Type      | Default  | Description                                                  |
| ----------------------- | --------- | -------- | ------------------------------------------------------------ |
| text                    | String    | Required | Pure text that you want to ellipsis. Support \n to wrap with useJsEllipsis={true}. |
| maxLine                 | Number    | 1        | Content will be truncated if the line count of content is bigger than `maxLine`. |
| maxHeight               | Number    |          | Content will be truncated if the height of content is bigger than `maxHeight`. Priority higher than maxLine. |
| className               | String    |          | Add className to component.                                  |
| ellipsis                | Boolean   | true     | Whether to ellipsis the text content.                        |
| ellipsisNode            | ReactNode | …        | Custom the ellipsis node.                                    |
| endExcludes             | String[]  | []       | The characters that want to remove at the end(Before ellipsis char). |
| dangerouslyUseInnerHTML | Boolean   | false    | Parse text as html(Make sure the text that you pass is safe, or you may been attacked by XSS). |
| reflowOnResize          | Boolean   |          | Whether update when container resize. Default true if native ellipsis support, otherwise false. |
| visibleLine             | Number    | maxLine  | Line count of visible content(Can't bigger than maxLine).    |
| visibleHeight           | Number    |          | Visible height of content. Priority higher than `visibleLine`. |

### Events

| Event Name      | Type                                      | Description                                                  |
| --------------- | ----------------------------------------- | ------------------------------------------------------------ |
| onReflow        | (ellipsis: Boolean, text: String) => void | Reflow callback, `ellipsis` is whether the text have been truncated. `text` is the visible content after truncating(Not include ellipsis char). |
| onEllipsisClick | () => void                                | Ellipsis click callback.                                     |

## Buy Me A Coffee

Open source is not easy, you can buy me a coffee. _Note your name or github id so I can add you to the donation list._

<table style="margin-left: auto; margin-right: auto;">
	<tr>
		<td style="padding: 25px;text-align:center;">
      <p style="font-size:25px;">Wechat Pay</p>
			<img src="https://user-images.githubusercontent.com/10976378/61703600-7e66f900-ad74-11e9-9eab-9ec57d1cf7e0.png">
		</td>
		<td style="padding: 25px;text-align:center;">
      <p style="font-size:25px;">Ali Pay</p>
			<img src="https://user-images.githubusercontent.com/10976378/61703625-9179c900-ad74-11e9-936c-9cf5b7d59aa7.png">
		</td>
	</tr>
</table>
### Donation List

❤️ Thanks these guys for donations. Contact me with <a href="mailto:mail@quincychen.cn" target="_blank" rel="noopener noreferrer nofollow" title="EMail">email</a>, if you had donated but not on the list.

| Donors                                  | Amount   | Time             |
| --------------------------------------- | -------- | ---------------- |
| [07akioni](https://github.com/07akioni) | ￥ 20.01 | 2021-09-27 13:53 |

## License

MIT

## Resources

- [Changelog](https://github.com/chenquincy/react-ellipsis/blob/master/CHANGELOG.md)

## Develop & Contribution

```sh
cd react-ellipsis
# install deps of component
yarn
# to docs
cd docs
# install deps of docs
yarn
# dev
yarn dev
# now you can develop in src or docs, then see the change in docs site.
# default: localhost:3000
```

If you want to contribute your code, send a pull request in [github](https://github.com/chenquincy/react-ellipsis/pulls).
