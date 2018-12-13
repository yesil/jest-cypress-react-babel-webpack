import {getSnapshot, Instance, types} from 'mobx-state-tree'

const MediaQuery = types
  .model('MediaQuery', {
    maxWidth: types.string,
    media: types.string,
    minWidth: types.string,
  })
  .views(self => {
    return {
      get css() {
        const media = ['@media only screen']
        if (self.minWidth) {
          media.push(`(min-width: ${self.minWidth})`)
        }
        if (self.maxWidth) {
          media.push(`(max-width: ${self.maxWidth})`)
        }
        return media.join(' and ')
      },
    }
  })

const Style = types.model('Style', {
  name: types.string,
  value: types.string,
})

type IStyle = Instance<typeof Style>

const Subject = types
  .model('Subject', {
    mediaQuery: types.optional(
      MediaQuery,
      getSnapshot(
        MediaQuery.create({
          maxWidth: '',
          media: '',
          minWidth: '',
        }),
      ),
    ),
    selector: types.string,
    styles: types.array(Style),
  })
  .views(self => {
    return {
      get css() {
        if (self.styles.length === 0) {
          return
        }
        const properties = self.styles
          .map(style => `\t${style.name}:${style.value};`)
          .join('\n')
        let css = `${self.selector} {\n${properties}\n}\n`
        const {media, minWidth, maxWidth} = self.mediaQuery
        if (media && (minWidth || maxWidth)) {
          css = `${self.mediaQuery.css} {\n${css}\n}\n`
        }
        return css
      },
    }
  })
  .actions(self => ({
    mediaQuery(media: string, minWidth = '', maxWidth = '') {
      self.mediaQuery = MediaQuery.create({media, minWidth, maxWidth})
    },
    style(name: string, value: any) {
      const style = Style.create({name, value})
      self.styles.push(style)
      return style
    },
    removeStyle(style: IStyle) {
      self.styles.remove(style)
    },
  }))
type ISubject = Instance<typeof Subject>

const Store = types
  .model('Store', {
    subjects: types.array(Subject),
  })
  .views(self => {
    return {
      get css() {
        if (self.subjects.length === 0) {
          return
        }
        return self.subjects.map(subject => `${subject.css}`).join('\n')
      },
    }
  })
  .actions(self => ({
    subject(selector: string) {
      const subject = Subject.create({selector})
      self.subjects.push(subject)
      return subject
    },
    removeSubject(subject: ISubject) {
      self.subjects.remove(subject)
      return subject
    },
  }))

export {MediaQuery, Style, Subject, Store}
