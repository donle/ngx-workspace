export default {
    input: './out-lib/ngx-workspace.js',
    output: {
        file: './bundles/ngx-workspace.umd.js',
        format: 'umd',
        name: 'ngx.workspace',
        globals: {
            '@angular/core': 'ng.core',
            '@angular/router': 'ng.router',
            '@angular/platform-browser': 'ng.platform-browser',
            '@angular/common': 'ng.common'
        }
    },
    external: [
        '@angular/core',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/common'
    ]
}
