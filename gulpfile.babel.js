import gulp from 'gulp'
import { exec } from 'child_process'

const typescript = (cb) => {
  exec(`pnpm tsc`, (error, stdout, stderr) => {
    console.log('Compiling...')

    if (error) {
      console.error(command, error)
      return
    }
      
    stderr ? console.log(stderr) : null
    stdout ? console.log(stdout) : null

    exec(`node dist/check.js`, (error, stdout, stderr) => {

      if (error) {
        console.error(command, error)
        return
      }
        
      stderr ? console.log(stderr) : null
      stdout ? console.log(stdout) : null
      console.log('Completed.')
    })
  })
  cb()
}

exports.default = function() {
  gulp.watch('app/**/*.ts', typescript)
}