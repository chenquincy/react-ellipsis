import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EllipsisComponent from '../src';

const App = () => {
  const [text, setText] = React.useState(
    `1 2 3 4 5 6 7 8 10 apple boy city day effect funny great hello init judge kill length mark no open pencil quit run save time unit view will xbox young zero`
  );
  const maxLine = 2;

  return (
    <div className="demo">
      <h3>Native ellipsis</h3>
      <EllipsisComponent className="ellipsis-content" text={text} maxLine={maxLine} />
      <h3>Not ellipsis</h3>
      <EllipsisComponent
        className="ellipsis-content"
        ellipsis={false}
        text={text}
        maxLine={maxLine}
      />
      <h3>Js ellipsis</h3>
      {/* <EllipsisComponent
        className="ellipsis-content"
        text={text}
        maxLine={maxLine}
        onReflow={(ellipsis, text) => {
          console.info('reflow => ', ellipsis, text);
        }}
      /> */}
      <div className="demo-js-ellipsis">
        {/* <h4>Max visible height</h4>
        <EllipsisComponent
          className="ellipsis-content"
          text={text}
          maxHeight="30"
          ellipsisChar=" ...Read More"
          onReflow={(ellipsis, text) => {
            console.info('reflow => ', ellipsis, text);
          }}
        />
        <h4>Custom ellipsis char</h4>
        <EllipsisComponent
          className="ellipsis-content"
          text={text}
          maxLine={maxLine}
          ellipsisChar=" ...Read More"
        />
        <h4>Custom ellipsis html</h4>
        <EllipsisComponent
          className="ellipsis-content"
          text={text}
          maxLine={maxLine}
          dangerousEllipsisHtml="<a href='#'>查看更多</a>"
        /> */}
        <h4>Reflow on container resize</h4>
        <EllipsisComponent
          className="ellipsis-content"
          text={text}
          maxLine={maxLine}
          reflowOnResize={true}
          dangerousEllipsisHtml="<a href='#'>查看更多</a>"
        />
        {/* <h4>End excludes(options.endExcludes=[' ', 't', 'i', 'm', 'e'])</h4>
        <EllipsisComponent
          className="ellipsis-content"
          text={text}
          maxLine={maxLine}
          reflowOnResize={true}
          endExcludes={[' ', 't', 'i', 'm']}
        /> */}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
