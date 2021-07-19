import React from 'react'

import axios from 'axios'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

class MdView extends React.Component {

  constructor(props) {
    super(props)

    // 设置 initial state
    this.state = {
      mdHtml: '<b>这是子组件</b>',
      navData: []
    };
  }

  componentDidMount () {
    this.renderMarkdown()
  }


  async renderMarkdown () {
    let mdBlob = await axios.get('src/view/demo.md')
    let _this = this
    let md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            // 得到经过highlight.js之后的html代码
            const preCode = hljs.highlight(lang, str, true).value

            // 以换行进行分割
            const lines = preCode.split(/\n/).slice(0, -1)

            // 添加自定义行号
            // let html = lines.map((item, index) => {
            //   return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
            // }).join('')
            // html = '<ol>' + html + '</ol>'
            let html = lines.map((item, index) => {
              return '<span class="line">' + item + '</span></br>'
            }).join('')
            html = '<span class="lines">' + html + '</span>'

            let lineBlock = lines.map((item, index) => {
              return '<span class="line-number">' + (index + 1) + '</span>'
            }).join('')
            lineBlock = '<div class="line-numbers">' + lineBlock + ' </div>'
            html += lineBlock

            // 添加代码语言
            if (lines.length) {
              html += '<b class="language-name">' + lang + '</b>'
            }

            return '<pre class="hljs"><code>' +
              html +
              '</code></pre>'
          } catch (__) { }
        }
        // 未添加代码语言，此处与上面同理
        const preCode = md.utils.escapeHtml(str)
        const lines = preCode.split(/\n/).slice(0, -1)
        let html = lines.map((item, index) => {
          return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
        }).join('')
        html = '<ol>' + html + '</ol>'
        return '<pre class="hljs"><code>' +
          html +
          '</code></pre>'
      }
    }).use(markdownItTocAndAnchor, {
      tocCallback (tocMarkdown, tocArray, tocHtml) {
        _this.setState({
          navData: tocArray
        })
      }
    })


    let result = md.render(mdBlob.data)
    this.setState({
      mdHtml: result
    })
  }



  render () {
    return (
      <div className="MdView"  >
        <div className="nav">
          {
            this.state.navData.map((item, index) => {
              if (item.level == 1) {
                return <a className="level" href={'#' + item.anchor}  key={index}>{item.content}</a>
              } else if (item.level == 2) {
                return <a className="level child" href={'#' + item.anchor}  key={index}>{item.content}</a>
              } else {
                return ''
              }
            })
          }

        </div>
        <div className="viewBox" dangerouslySetInnerHTML={{ __html: this.state.mdHtml }}>
        </div>
      </div>
    )
  }
}

export default MdView
