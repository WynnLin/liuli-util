import { copyFile, readdir, readJson, writeFile } from 'fs-extra'
import * as path from 'path'

export function generateReadme({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return `# ${name}

> ${description}

查看文档网站 [${name}](https://util.liuli.moe/${name})

## 安装

使用 yarn:

\`\`\`sh
yarn add ${name}
\`\`\`

或者使用 npm:

\`\`\`sh
npm install ${name}
\`\`\`
`
}

async function writeReadme(name: string, text: string) {
  const src = path.resolve(
    __dirname,
    'libs',
    name.slice(name.lastIndexOf('/') + 1),
    'README.md',
  )
  await writeFile(src, text)
}

const excludeLib = ['cli']

/**
 * 生成所有子模块的 README 文件
 */
export async function generateReadmes() {
  const dirNameList = (await readdir('./libs')).filter(
    (name) => !excludeLib.includes(name),
  )
  const pkgJsonList = await Promise.all(
    dirNameList.map((name) =>
      readJson(path.resolve(__dirname, 'libs', name, 'package.json')),
    ),
  )
  console.log(
    pkgJsonList.map((item) => ({
      name: item.name,
      description: item.description,
    })),
  )
  pkgJsonList.map((item) => {
    const text = generateReadme(item)
    writeReadme(item.name, text)
  })
}

/**
 * 复制一些在线文档需要的内容
 */
export async function copyDocsFile() {
  await copyFile('./CNAME', './docs/CNAME')
}
