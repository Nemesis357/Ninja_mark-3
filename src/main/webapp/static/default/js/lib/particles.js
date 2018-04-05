<<<<<<< HEAD
(function() {
  var GLSL, error, gl, gui, nogl;

  GLSL = {
    // Vertex shader
    vert: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Uniforms\nuniform vec2 u_resolution;\n\n// Attributes\nattribute vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4 (a_position, 0, 1);\n}\n",
    // Fragment shader
    frag: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform bool u_scanlines;\nuniform vec2 u_resolution;\n\nuniform float u_brightness;\nuniform float u_blobiness;\nuniform float u_particles;\nuniform float u_millis;\nuniform float u_energy;\n\n// https://goo.gl/LrCde\nfloat noise( vec2 co ){\n    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\n}\n\nvoid main( void ) {\n\n    vec2 position = ( gl_FragCoord.xy / u_resolution.x );\n    float t = u_millis * 0.001 * u_energy;\n    \n    float a = 0.0;\n    float b = 0.0;\n    float c = 0.0;\n\n    vec2 pos, center = vec2( 0.5, 0.5 * (u_resolution.y / u_resolution.x) );\n    \n    float na, nb, nc, nd, d;\n    float limit = u_particles / 40.0;\n    float step = 1.0 / u_particles;\n    float n = 0.0;\n    \n    for ( float i = 0.0; i <= 1.0; i += 0.025 ) {\n\n        if ( i <= limit ) {\n\n            vec2 np = vec2(n, 1-1);\n            \n            na = noise( np * 1.1 );\n            nb = noise( np * 2.8 );\n            nc = noise( np * 0.7 );\n            nd = noise( np * 3.2 );\n\n            pos = center;\n            pos.x += sin(t*na) * cos(t*nb) * tan(t*na*0.15) * 0.3;\n            pos.y += tan(t*nc) * sin(t*nd) * 0.1;\n            \n            d = pow( 1.6*na / length( pos - position ), u_blobiness );\n            \n            if ( i < limit * 0.3333 ) a += d;\n            else if ( i < limit * 0.6666 ) b += d;\n            else c += d;\n\n            n += step;\n        }\n    }\n    \n    vec3 col = vec3(a*c,b*c,a*b) * 0.0001 * u_brightness;\n    \n    if ( u_scanlines ) {\n        col -= mod( gl_FragCoord.y, 2.0 ) < 1.0 ? 0.5 : 0.0;\n    }\n    \n    gl_FragColor = vec4( col, 1.0 );\n\n}\n"
  };

  try {
    gl = Sketch.create({
      // Sketch settings
      container: document.getElementById('particles-container'),
      type: Sketch.WEB_GL,
      // Uniforms
      brightness: 0.8,
      blobiness: 1.5,
      particles: 40,
      energy: 1.01,
      scanlines: true
    });
  } catch (error1) {
    error = error1;
    console.log(error);
//    nogl = document.getElementById('nogl');
//    nogl.style.display = 'block';
  }

  if (gl) {
    gl.setup = function() {
      var frag, vert;
      this.clearColor(0.0, 0.0, 0.0, 1.0);
      // Setup shaders
      vert = this.createShader(this.VERTEX_SHADER);
      frag = this.createShader(this.FRAGMENT_SHADER);
      this.shaderSource(vert, GLSL.vert);
      this.shaderSource(frag, GLSL.frag);
      this.compileShader(vert);
      this.compileShader(frag);
      if (!this.getShaderParameter(vert, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(vert);
      }
      if (!this.getShaderParameter(frag, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(frag);
      }
      this.shaderProgram = this.createProgram();
      this.attachShader(this.shaderProgram, vert);
      this.attachShader(this.shaderProgram, frag);
      this.linkProgram(this.shaderProgram);
      if (!this.getProgramParameter(this.shaderProgram, this.LINK_STATUS)) {
        throw 'Failed to initialise shaders';
      }
      this.useProgram(this.shaderProgram);
      // Store attribute / uniform locations
      this.shaderProgram.attributes = {
        position: this.getAttribLocation(this.shaderProgram, 'a_position')
      };
      this.shaderProgram.uniforms = {
        resolution: this.getUniformLocation(this.shaderProgram, 'u_resolution'),
        brightness: this.getUniformLocation(this.shaderProgram, 'u_brightness'),
        blobiness: this.getUniformLocation(this.shaderProgram, 'u_blobiness'),
        particles: this.getUniformLocation(this.shaderProgram, 'u_particles'),
        scanlines: this.getUniformLocation(this.shaderProgram, 'u_scanlines'),
        energy: this.getUniformLocation(this.shaderProgram, 'u_energy'),
        millis: this.getUniformLocation(this.shaderProgram, 'u_millis')
      };
      // Create geometry
      this.geometry = this.createBuffer();
      this.geometry.vertexCount = 6;
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), this.STATIC_DRAW);
      this.enableVertexAttribArray(this.shaderProgram.attributes.position);
      this.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.FLOAT, false, 0, 0);
      // Resize to window
      return this.resize();
    };
    gl.updateUniforms = function() {
      if (!this.shaderProgram) {
        return;
      }
      this.uniform2f(this.shaderProgram.uniforms.resolution, this.width, this.height);
      this.uniform1f(this.shaderProgram.uniforms.brightness, this.brightness);
      this.uniform1f(this.shaderProgram.uniforms.blobiness, this.blobiness);
      this.uniform1f(this.shaderProgram.uniforms.particles, this.particles);
      this.uniform1i(this.shaderProgram.uniforms.scanlines, this.scanlines);
      return this.uniform1f(this.shaderProgram.uniforms.energy, this.energy);
    };
    gl.draw = function() {
      // Update uniforms
      this.uniform1f(this.shaderProgram.uniforms.millis, this.millis + 5000);
      // Render
      this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      return this.drawArrays(this.TRIANGLES, 0, this.geometry.vertexCount);
    };
    gl.resize = function() {
      // Update resolution
      this.viewport(0, 0, this.width, this.height);
      // Update uniforms if the shader program is ready
      return this.updateUniforms();
    };
    // GUI
    gui = new dat.GUI();
    gui.add(gl, 'particles').step(1.0).min(8).max(40).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'brightness').step(0.01).min(0.1).max(1.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'blobiness').step(0.01).min(0.8).max(1.5).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'energy').step(0.01).min(0.1).max(4.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'scanlines').onChange(function() {
      return gl.updateUniforms();
    });
    gui.close();
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQTs7RUFBQSxJQUFBLEdBSUksQ0FBQTs7SUFBQSxJQUFBLEVBQU0sNE1BQU47O0lBb0JBLElBQUEsRUFBTTtFQXBCTjs7QUE2Rko7SUFFSSxFQUFBLEdBQUssTUFBTSxDQUFDLE1BQVAsQ0FJRCxDQUFBOztNQUFBLFNBQUEsRUFBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFYO01BQ0EsSUFBQSxFQUFNLE1BQU0sQ0FBQyxNQURiOztNQUtBLFVBQUEsRUFBWSxHQUxaO01BTUEsU0FBQSxFQUFXLEdBTlg7TUFPQSxTQUFBLEVBQVcsRUFQWDtNQVFBLE1BQUEsRUFBUSxJQVJSO01BU0EsU0FBQSxFQUFXO0lBVFgsQ0FKQyxFQUZUO0dBQUEsY0FBQTtJQWlCTTtJQUVGLElBQUEsR0FBTyxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QjtJQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxHQUFxQixRQXBCekI7OztFQXNCQSxJQUFHLEVBQUg7SUFFSSxFQUFFLENBQUMsS0FBSCxHQUFXLFFBQUEsQ0FBQSxDQUFBO0FBRVAsVUFBQSxJQUFBLEVBQUE7TUFBQSxJQUFJLENBQUMsVUFBTCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixFQUFBOztNQUlBLElBQUEsR0FBTyxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxhQUFmO01BQ1AsSUFBQSxHQUFPLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLGVBQWY7TUFFUCxJQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsRUFBb0IsSUFBSSxDQUFDLElBQXpCO01BQ0EsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFkLEVBQW9CLElBQUksQ0FBQyxJQUF6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QTdDLENBQWtELENBQUMsR0FBbkQsQ0FBd0QsR0FBeEQsQ0FBNkQsQ0FBQyxRQUE5RCxDQUF1RSxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUF2RTtJQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsRUFBVCxFQUFhLFFBQWIsQ0FBdUIsQ0FBQyxJQUF4QixDQUE4QixJQUE5QixDQUFvQyxDQUFDLEdBQXJDLENBQTBDLEdBQTFDLENBQStDLENBQUMsR0FBaEQsQ0FBcUQsR0FBckQsQ0FBMEQsQ0FBQyxRQUEzRCxDQUFvRSxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUFwRTtJQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsRUFBVCxFQUFhLFdBQWIsQ0FBMEIsQ0FBQyxRQUEzQixDQUFvQyxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUFwQztJQUNBLEdBQUcsQ0FBQyxLQUFKLENBQUEsRUF4R0o7O0FBdkhBIiwic291cmNlc0NvbnRlbnQiOlsiXG5HTFNMID1cblxuICAgICMgVmVydGV4IHNoYWRlclxuXG4gICAgdmVydDogXCJcIlwiXG5cbiAgICAjaWZkZWYgR0xfRVNcbiAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiAgICAjZW5kaWZcblxuICAgIC8vIFVuaWZvcm1zXG4gICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcblxuICAgIC8vIEF0dHJpYnV0ZXNcbiAgICBhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xuXG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQgKGFfcG9zaXRpb24sIDAsIDEpO1xuICAgIH1cblxuICAgIFwiXCJcIlxuXG4gICAgIyBGcmFnbWVudCBzaGFkZXJcblxuICAgIGZyYWc6IFwiXCJcIlxuXG4gICAgI2lmZGVmIEdMX0VTXG4gICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgI2VuZGlmXG5cbiAgICB1bmlmb3JtIGJvb2wgdV9zY2FubGluZXM7XG4gICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcbiAgICBcbiAgICB1bmlmb3JtIGZsb2F0IHVfYnJpZ2h0bmVzcztcbiAgICB1bmlmb3JtIGZsb2F0IHVfYmxvYmluZXNzO1xuICAgIHVuaWZvcm0gZmxvYXQgdV9wYXJ0aWNsZXM7XG4gICAgdW5pZm9ybSBmbG9hdCB1X21pbGxpcztcbiAgICB1bmlmb3JtIGZsb2F0IHVfZW5lcmd5O1xuXG4gICAgLy8gaHR0cHM6Ly9nb28uZ2wvTHJDZGVcbiAgICBmbG9hdCBub2lzZSggdmVjMiBjbyApe1xuICAgICAgICByZXR1cm4gZnJhY3QoIHNpbiggZG90KCBjby54eSwgdmVjMiggMTIuOTg5OCwgNzguMjMzICkgKSApICogNDM3NTguNTQ1MyApO1xuICAgIH1cblxuICAgIHZvaWQgbWFpbiggdm9pZCApIHtcblxuICAgICAgICB2ZWMyIHBvc2l0aW9uID0gKCBnbF9GcmFnQ29vcmQueHkgLyB1X3Jlc29sdXRpb24ueCApO1xuICAgICAgICBmbG9hdCB0ID0gdV9taWxsaXMgKiAwLjAwMSAqIHVfZW5lcmd5O1xuICAgICAgICBcbiAgICAgICAgZmxvYXQgYSA9IDAuMDtcbiAgICAgICAgZmxvYXQgYiA9IDAuMDtcbiAgICAgICAgZmxvYXQgYyA9IDAuMDtcblxuICAgICAgICB2ZWMyIHBvcywgY2VudGVyID0gdmVjMiggMC41LCAwLjUgKiAodV9yZXNvbHV0aW9uLnkgLyB1X3Jlc29sdXRpb24ueCkgKTtcbiAgICAgICAgXG4gICAgICAgIGZsb2F0IG5hLCBuYiwgbmMsIG5kLCBkO1xuICAgICAgICBmbG9hdCBsaW1pdCA9IHVfcGFydGljbGVzIC8gNDAuMDtcbiAgICAgICAgZmxvYXQgc3RlcCA9IDEuMCAvIHVfcGFydGljbGVzO1xuICAgICAgICBmbG9hdCBuID0gMC4wO1xuICAgICAgICBcbiAgICAgICAgZm9yICggZmxvYXQgaSA9IDAuMDsgaSA8PSAxLjA7IGkgKz0gMC4wMjUgKSB7XG5cbiAgICAgICAgICAgIGlmICggaSA8PSBsaW1pdCApIHtcblxuICAgICAgICAgICAgICAgIHZlYzIgbnAgPSB2ZWMyKG4sIDEtMSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbmEgPSBub2lzZSggbnAgKiAxLjEgKTtcbiAgICAgICAgICAgICAgICBuYiA9IG5vaXNlKCBucCAqIDIuOCApO1xuICAgICAgICAgICAgICAgIG5jID0gbm9pc2UoIG5wICogMC43ICk7XG4gICAgICAgICAgICAgICAgbmQgPSBub2lzZSggbnAgKiAzLjIgKTtcblxuICAgICAgICAgICAgICAgIHBvcyA9IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwb3MueCArPSBzaW4odCpuYSkgKiBjb3ModCpuYikgKiB0YW4odCpuYSowLjE1KSAqIDAuMztcbiAgICAgICAgICAgICAgICBwb3MueSArPSB0YW4odCpuYykgKiBzaW4odCpuZCkgKiAwLjE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZCA9IHBvdyggMS42Km5hIC8gbGVuZ3RoKCBwb3MgLSBwb3NpdGlvbiApLCB1X2Jsb2JpbmVzcyApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICggaSA8IGxpbWl0ICogMC4zMzMzICkgYSArPSBkO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBpIDwgbGltaXQgKiAwLjY2NjYgKSBiICs9IGQ7XG4gICAgICAgICAgICAgICAgZWxzZSBjICs9IGQ7XG5cbiAgICAgICAgICAgICAgICBuICs9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZlYzMgY29sID0gdmVjMyhhKmMsYipjLGEqYikgKiAwLjAwMDEgKiB1X2JyaWdodG5lc3M7XG4gICAgICAgIFxuICAgICAgICBpZiAoIHVfc2NhbmxpbmVzICkge1xuICAgICAgICAgICAgY29sIC09IG1vZCggZ2xfRnJhZ0Nvb3JkLnksIDIuMCApIDwgMS4wID8gMC41IDogMC4wO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIDEuMCApO1xuXG4gICAgfVxuXG4gICAgXCJcIlwiXG5cbnRyeVxuICAgIFxuICAgIGdsID0gU2tldGNoLmNyZWF0ZVxuXG4gICAgICAgICMgU2tldGNoIHNldHRpbmdzXG5cbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGFpbmVyJ1xuICAgICAgICB0eXBlOiBTa2V0Y2guV0VCX0dMXG5cbiAgICAgICAgIyBVbmlmb3Jtc1xuXG4gICAgICAgIGJyaWdodG5lc3M6IDAuOFxuICAgICAgICBibG9iaW5lc3M6IDEuNVxuICAgICAgICBwYXJ0aWNsZXM6IDQwXG4gICAgICAgIGVuZXJneTogMS4wMVxuICAgICAgICBzY2FubGluZXM6IHllc1xuXG5jYXRjaCBlcnJvclxuXG4gICAgbm9nbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdub2dsJ1xuICAgIG5vZ2wuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcblxuaWYgZ2xcblxuICAgIGdsLnNldHVwID0gLT5cblxuICAgICAgICB0aGlzLmNsZWFyQ29sb3IgMC4wLCAwLjAsIDAuMCwgMS4wXG5cbiAgICAgICAgIyBTZXR1cCBzaGFkZXJzXG5cbiAgICAgICAgdmVydCA9IEBjcmVhdGVTaGFkZXIgQFZFUlRFWF9TSEFERVJcbiAgICAgICAgZnJhZyA9IEBjcmVhdGVTaGFkZXIgQEZSQUdNRU5UX1NIQURFUlxuXG4gICAgICAgIEBzaGFkZXJTb3VyY2UgdmVydCwgR0xTTC52ZXJ0XG4gICAgICAgIEBzaGFkZXJTb3VyY2UgZnJhZywgR0xTTC5mcmFnXG5cbiAgICAgICAgQGNvbXBpbGVTaGFkZXIgdmVydFxuICAgICAgICBAY29tcGlsZVNoYWRlciBmcmFnXG5cbiAgICAgICAgdGhyb3cgQGdldFNoYWRlckluZm9Mb2cgdmVydCBpZiBub3QgQGdldFNoYWRlclBhcmFtZXRlciB2ZXJ0LCBAQ09NUElMRV9TVEFUVVNcbiAgICAgICAgdGhyb3cgQGdldFNoYWRlckluZm9Mb2cgZnJhZyBpZiBub3QgQGdldFNoYWRlclBhcmFtZXRlciBmcmFnLCBAQ09NUElMRV9TVEFUVVNcblxuICAgICAgICBAc2hhZGVyUHJvZ3JhbSA9IGRvIEBjcmVhdGVQcm9ncmFtXG4gICAgICAgIEAuYXR0YWNoU2hhZGVyIEBzaGFkZXJQcm9ncmFtLCB2ZXJ0XG4gICAgICAgIEAuYXR0YWNoU2hhZGVyIEBzaGFkZXJQcm9ncmFtLCBmcmFnXG4gICAgICAgIEBsaW5rUHJvZ3JhbSBAc2hhZGVyUHJvZ3JhbVxuXG4gICAgICAgIHRocm93ICdGYWlsZWQgdG8gaW5pdGlhbGlzZSBzaGFkZXJzJyBpZiBub3QgQGdldFByb2dyYW1QYXJhbWV0ZXIgQHNoYWRlclByb2dyYW0sIEBMSU5LX1NUQVRVU1xuXG4gICAgICAgIEB1c2VQcm9ncmFtIEBzaGFkZXJQcm9ncmFtXG5cbiAgICAgICAgIyBTdG9yZSBhdHRyaWJ1dGUgLyB1bmlmb3JtIGxvY2F0aW9uc1xuXG4gICAgICAgIEBzaGFkZXJQcm9ncmFtLmF0dHJpYnV0ZXMgPVxuICAgICAgICAgICAgcG9zaXRpb246IEBnZXRBdHRyaWJMb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ2FfcG9zaXRpb24nXG5cbiAgICAgICAgQHNoYWRlclByb2dyYW0udW5pZm9ybXMgPVxuICAgICAgICAgICAgcmVzb2x1dGlvbjogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfcmVzb2x1dGlvbidcbiAgICAgICAgICAgIGJyaWdodG5lc3M6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2JyaWdodG5lc3MnXG4gICAgICAgICAgICBibG9iaW5lc3M6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2Jsb2JpbmVzcydcbiAgICAgICAgICAgIHBhcnRpY2xlczogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfcGFydGljbGVzJ1xuICAgICAgICAgICAgc2NhbmxpbmVzOiBAZ2V0VW5pZm9ybUxvY2F0aW9uIEBzaGFkZXJQcm9ncmFtLCAndV9zY2FubGluZXMnXG4gICAgICAgICAgICBlbmVyZ3k6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2VuZXJneSdcbiAgICAgICAgICAgIG1pbGxpczogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfbWlsbGlzJ1xuXG4gICAgICAgICMgQ3JlYXRlIGdlb21ldHJ5XG5cbiAgICAgICAgQGdlb21ldHJ5ID0gZG8gQGNyZWF0ZUJ1ZmZlclxuICAgICAgICBAZ2VvbWV0cnkudmVydGV4Q291bnQgPSA2XG5cbiAgICAgICAgQGJpbmRCdWZmZXIgQEFSUkFZX0JVRkZFUiwgQGdlb21ldHJ5XG4gICAgICAgIEBidWZmZXJEYXRhIEBBUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgLTEuMCwgLTEuMCwgXG4gICAgICAgICAgICAgMS4wLCAtMS4wLCBcbiAgICAgICAgICAgIC0xLjAsICAxLjAsIFxuICAgICAgICAgICAgLTEuMCwgIDEuMCwgXG4gICAgICAgICAgICAgMS4wLCAtMS4wLCBcbiAgICAgICAgICAgICAxLjAsICAxLjBdKSxcbiAgICAgICAgICAgICBAU1RBVElDX0RSQVdcblxuICAgICAgICBAZW5hYmxlVmVydGV4QXR0cmliQXJyYXkgQHNoYWRlclByb2dyYW0uYXR0cmlidXRlcy5wb3NpdGlvblxuICAgICAgICBAdmVydGV4QXR0cmliUG9pbnRlciBAc2hhZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBvc2l0aW9uLCAyLCBARkxPQVQsIG5vLCAwLCAwXG5cbiAgICAgICAgIyBSZXNpemUgdG8gd2luZG93XG4gICAgICAgIGRvIEByZXNpemVcblxuICAgIGdsLnVwZGF0ZVVuaWZvcm1zID0gLT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNoYWRlclByb2dyYW1cblxuICAgICAgICBAdW5pZm9ybTJmIEBzaGFkZXJQcm9ncmFtLnVuaWZvcm1zLnJlc29sdXRpb24sIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBAdW5pZm9ybTFmIEBzaGFkZXJQcm9ncmFtLnVuaWZvcm1zLmJyaWdodG5lc3MsIEBicmlnaHRuZXNzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuYmxvYmluZXNzLCBAYmxvYmluZXNzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMucGFydGljbGVzLCBAcGFydGljbGVzXG4gICAgICAgIEB1bmlmb3JtMWkgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuc2NhbmxpbmVzLCBAc2NhbmxpbmVzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuZW5lcmd5LCBAZW5lcmd5XG5cbiAgICBnbC5kcmF3ID0gLT5cblxuICAgICAgICAjIFVwZGF0ZSB1bmlmb3Jtc1xuXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMubWlsbGlzLCBAbWlsbGlzICsgNTAwMFxuXG4gICAgICAgICMgUmVuZGVyXG5cbiAgICAgICAgQGNsZWFyIEBDT0xPUl9CVUZGRVJfQklUIHwgQERFUFRIX0JVRkZFUl9CSVRcbiAgICAgICAgQGJpbmRCdWZmZXIgQEFSUkFZX0JVRkZFUiwgQGdlb21ldHJ5XG4gICAgICAgIEBkcmF3QXJyYXlzIEBUUklBTkdMRVMsIDAsIEBnZW9tZXRyeS52ZXJ0ZXhDb3VudFxuXG4gICAgZ2wucmVzaXplID0gLT5cblxuICAgICAgICAjIFVwZGF0ZSByZXNvbHV0aW9uXG5cbiAgICAgICAgQHZpZXdwb3J0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgICAgICMgVXBkYXRlIHVuaWZvcm1zIGlmIHRoZSBzaGFkZXIgcHJvZ3JhbSBpcyByZWFkeVxuXG4gICAgICAgIGRvIEB1cGRhdGVVbmlmb3Jtc1xuXG4gICAgIyBHVUlcbiAgICBndWkgPSBuZXcgZGF0LkdVSSgpXG4gICAgZ3VpLmFkZCggZ2wsICdwYXJ0aWNsZXMnICkuc3RlcCggMS4wICkubWluKCA4ICkubWF4KCA0MCApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmFkZCggZ2wsICdicmlnaHRuZXNzJyApLnN0ZXAoIDAuMDEgKS5taW4oIDAuMSApLm1heCggMS4wICkub25DaGFuZ2UgLT4gZG8gZ2wudXBkYXRlVW5pZm9ybXNcbiAgICBndWkuYWRkKCBnbCwgJ2Jsb2JpbmVzcycgKS5zdGVwKCAwLjAxICkubWluKCAwLjggKS5tYXgoIDEuNSApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmFkZCggZ2wsICdlbmVyZ3knICkuc3RlcCggMC4wMSApLm1pbiggMC4xICkubWF4KCA0LjAgKS5vbkNoYW5nZSAtPiBkbyBnbC51cGRhdGVVbmlmb3Jtc1xuICAgIGd1aS5hZGQoIGdsLCAnc2NhbmxpbmVzJyApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmNsb3NlKClcbiJdfQ==
=======
(function() {
  var GLSL, error, gl, gui, nogl;

  GLSL = {
    // Vertex shader
    vert: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Uniforms\nuniform vec2 u_resolution;\n\n// Attributes\nattribute vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4 (a_position, 0, 1);\n}\n",
    // Fragment shader
    frag: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform bool u_scanlines;\nuniform vec2 u_resolution;\n\nuniform float u_brightness;\nuniform float u_blobiness;\nuniform float u_particles;\nuniform float u_millis;\nuniform float u_energy;\n\n// https://goo.gl/LrCde\nfloat noise( vec2 co ){\n    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\n}\n\nvoid main( void ) {\n\n    vec2 position = ( gl_FragCoord.xy / u_resolution.x );\n    float t = u_millis * 0.001 * u_energy;\n    \n    float a = 0.0;\n    float b = 0.0;\n    float c = 0.0;\n\n    vec2 pos, center = vec2( 0.5, 0.5 * (u_resolution.y / u_resolution.x) );\n    \n    float na, nb, nc, nd, d;\n    float limit = u_particles / 40.0;\n    float step = 1.0 / u_particles;\n    float n = 0.0;\n    \n    for ( float i = 0.0; i <= 1.0; i += 0.025 ) {\n\n        if ( i <= limit ) {\n\n            vec2 np = vec2(n, 1-1);\n            \n            na = noise( np * 1.1 );\n            nb = noise( np * 2.8 );\n            nc = noise( np * 0.7 );\n            nd = noise( np * 3.2 );\n\n            pos = center;\n            pos.x += sin(t*na) * cos(t*nb) * tan(t*na*0.15) * 0.3;\n            pos.y += tan(t*nc) * sin(t*nd) * 0.1;\n            \n            d = pow( 1.6*na / length( pos - position ), u_blobiness );\n            \n            if ( i < limit * 0.3333 ) a += d;\n            else if ( i < limit * 0.6666 ) b += d;\n            else c += d;\n\n            n += step;\n        }\n    }\n    \n    vec3 col = vec3(a*c,b*c,a*b) * 0.0001 * u_brightness;\n    \n    if ( u_scanlines ) {\n        col -= mod( gl_FragCoord.y, 2.0 ) < 1.0 ? 0.5 : 0.0;\n    }\n    \n    gl_FragColor = vec4( col, 1.0 );\n\n}\n"
  };

  try {
    gl = Sketch.create({
      // Sketch settings
      container: document.getElementById('particles-container'),
      type: Sketch.WEB_GL,
      // Uniforms
      brightness: 0.8,
      blobiness: 1.5,
      particles: 40,
      energy: 1.01,
      scanlines: true
    });
  } catch (error1) {
    error = error1;
    console.log(error);
//    nogl = document.getElementById('nogl');
//    nogl.style.display = 'block';
  }

  if (gl) {
    gl.setup = function() {
      var frag, vert;
      this.clearColor(0.0, 0.0, 0.0, 1.0);
      // Setup shaders
      vert = this.createShader(this.VERTEX_SHADER);
      frag = this.createShader(this.FRAGMENT_SHADER);
      this.shaderSource(vert, GLSL.vert);
      this.shaderSource(frag, GLSL.frag);
      this.compileShader(vert);
      this.compileShader(frag);
      if (!this.getShaderParameter(vert, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(vert);
      }
      if (!this.getShaderParameter(frag, this.COMPILE_STATUS)) {
        throw this.getShaderInfoLog(frag);
      }
      this.shaderProgram = this.createProgram();
      this.attachShader(this.shaderProgram, vert);
      this.attachShader(this.shaderProgram, frag);
      this.linkProgram(this.shaderProgram);
      if (!this.getProgramParameter(this.shaderProgram, this.LINK_STATUS)) {
        throw 'Failed to initialise shaders';
      }
      this.useProgram(this.shaderProgram);
      // Store attribute / uniform locations
      this.shaderProgram.attributes = {
        position: this.getAttribLocation(this.shaderProgram, 'a_position')
      };
      this.shaderProgram.uniforms = {
        resolution: this.getUniformLocation(this.shaderProgram, 'u_resolution'),
        brightness: this.getUniformLocation(this.shaderProgram, 'u_brightness'),
        blobiness: this.getUniformLocation(this.shaderProgram, 'u_blobiness'),
        particles: this.getUniformLocation(this.shaderProgram, 'u_particles'),
        scanlines: this.getUniformLocation(this.shaderProgram, 'u_scanlines'),
        energy: this.getUniformLocation(this.shaderProgram, 'u_energy'),
        millis: this.getUniformLocation(this.shaderProgram, 'u_millis')
      };
      // Create geometry
      this.geometry = this.createBuffer();
      this.geometry.vertexCount = 6;
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      this.bufferData(this.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), this.STATIC_DRAW);
      this.enableVertexAttribArray(this.shaderProgram.attributes.position);
      this.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.FLOAT, false, 0, 0);
      // Resize to window
      return this.resize();
    };
    gl.updateUniforms = function() {
      if (!this.shaderProgram) {
        return;
      }
      this.uniform2f(this.shaderProgram.uniforms.resolution, this.width, this.height);
      this.uniform1f(this.shaderProgram.uniforms.brightness, this.brightness);
      this.uniform1f(this.shaderProgram.uniforms.blobiness, this.blobiness);
      this.uniform1f(this.shaderProgram.uniforms.particles, this.particles);
      this.uniform1i(this.shaderProgram.uniforms.scanlines, this.scanlines);
      return this.uniform1f(this.shaderProgram.uniforms.energy, this.energy);
    };
    gl.draw = function() {
      // Update uniforms
      this.uniform1f(this.shaderProgram.uniforms.millis, this.millis + 5000);
      // Render
      this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
      this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
      return this.drawArrays(this.TRIANGLES, 0, this.geometry.vertexCount);
    };
    gl.resize = function() {
      // Update resolution
      this.viewport(0, 0, this.width, this.height);
      // Update uniforms if the shader program is ready
      return this.updateUniforms();
    };
    // GUI
    gui = new dat.GUI();
    gui.add(gl, 'particles').step(1.0).min(8).max(40).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'brightness').step(0.01).min(0.1).max(1.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'blobiness').step(0.01).min(0.8).max(1.5).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'energy').step(0.01).min(0.1).max(4.0).onChange(function() {
      return gl.updateUniforms();
    });
    gui.add(gl, 'scanlines').onChange(function() {
      return gl.updateUniforms();
    });
    gui.close();
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQTs7RUFBQSxJQUFBLEdBSUksQ0FBQTs7SUFBQSxJQUFBLEVBQU0sNE1BQU47O0lBb0JBLElBQUEsRUFBTTtFQXBCTjs7QUE2Rko7SUFFSSxFQUFBLEdBQUssTUFBTSxDQUFDLE1BQVAsQ0FJRCxDQUFBOztNQUFBLFNBQUEsRUFBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFYO01BQ0EsSUFBQSxFQUFNLE1BQU0sQ0FBQyxNQURiOztNQUtBLFVBQUEsRUFBWSxHQUxaO01BTUEsU0FBQSxFQUFXLEdBTlg7TUFPQSxTQUFBLEVBQVcsRUFQWDtNQVFBLE1BQUEsRUFBUSxJQVJSO01BU0EsU0FBQSxFQUFXO0lBVFgsQ0FKQyxFQUZUO0dBQUEsY0FBQTtJQWlCTTtJQUVGLElBQUEsR0FBTyxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QjtJQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxHQUFxQixRQXBCekI7OztFQXNCQSxJQUFHLEVBQUg7SUFFSSxFQUFFLENBQUMsS0FBSCxHQUFXLFFBQUEsQ0FBQSxDQUFBO0FBRVAsVUFBQSxJQUFBLEVBQUE7TUFBQSxJQUFJLENBQUMsVUFBTCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixFQUFBOztNQUlBLElBQUEsR0FBTyxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxhQUFmO01BQ1AsSUFBQSxHQUFPLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLGVBQWY7TUFFUCxJQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsRUFBb0IsSUFBSSxDQUFDLElBQXpCO01BQ0EsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFkLEVBQW9CLElBQUksQ0FBQyxJQUF6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QTdDLENBQWtELENBQUMsR0FBbkQsQ0FBd0QsR0FBeEQsQ0FBNkQsQ0FBQyxRQUE5RCxDQUF1RSxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUF2RTtJQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsRUFBVCxFQUFhLFFBQWIsQ0FBdUIsQ0FBQyxJQUF4QixDQUE4QixJQUE5QixDQUFvQyxDQUFDLEdBQXJDLENBQTBDLEdBQTFDLENBQStDLENBQUMsR0FBaEQsQ0FBcUQsR0FBckQsQ0FBMEQsQ0FBQyxRQUEzRCxDQUFvRSxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUFwRTtJQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVMsRUFBVCxFQUFhLFdBQWIsQ0FBMEIsQ0FBQyxRQUEzQixDQUFvQyxRQUFBLENBQUEsQ0FBQTthQUFNLEVBQUUsQ0FBQyxjQUFOLENBQUE7SUFBSCxDQUFwQztJQUNBLEdBQUcsQ0FBQyxLQUFKLENBQUEsRUF4R0o7O0FBdkhBIiwic291cmNlc0NvbnRlbnQiOlsiXG5HTFNMID1cblxuICAgICMgVmVydGV4IHNoYWRlclxuXG4gICAgdmVydDogXCJcIlwiXG5cbiAgICAjaWZkZWYgR0xfRVNcbiAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiAgICAjZW5kaWZcblxuICAgIC8vIFVuaWZvcm1zXG4gICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcblxuICAgIC8vIEF0dHJpYnV0ZXNcbiAgICBhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xuXG4gICAgdm9pZCBtYWluKCkge1xuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQgKGFfcG9zaXRpb24sIDAsIDEpO1xuICAgIH1cblxuICAgIFwiXCJcIlxuXG4gICAgIyBGcmFnbWVudCBzaGFkZXJcblxuICAgIGZyYWc6IFwiXCJcIlxuXG4gICAgI2lmZGVmIEdMX0VTXG4gICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgI2VuZGlmXG5cbiAgICB1bmlmb3JtIGJvb2wgdV9zY2FubGluZXM7XG4gICAgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcbiAgICBcbiAgICB1bmlmb3JtIGZsb2F0IHVfYnJpZ2h0bmVzcztcbiAgICB1bmlmb3JtIGZsb2F0IHVfYmxvYmluZXNzO1xuICAgIHVuaWZvcm0gZmxvYXQgdV9wYXJ0aWNsZXM7XG4gICAgdW5pZm9ybSBmbG9hdCB1X21pbGxpcztcbiAgICB1bmlmb3JtIGZsb2F0IHVfZW5lcmd5O1xuXG4gICAgLy8gaHR0cHM6Ly9nb28uZ2wvTHJDZGVcbiAgICBmbG9hdCBub2lzZSggdmVjMiBjbyApe1xuICAgICAgICByZXR1cm4gZnJhY3QoIHNpbiggZG90KCBjby54eSwgdmVjMiggMTIuOTg5OCwgNzguMjMzICkgKSApICogNDM3NTguNTQ1MyApO1xuICAgIH1cblxuICAgIHZvaWQgbWFpbiggdm9pZCApIHtcblxuICAgICAgICB2ZWMyIHBvc2l0aW9uID0gKCBnbF9GcmFnQ29vcmQueHkgLyB1X3Jlc29sdXRpb24ueCApO1xuICAgICAgICBmbG9hdCB0ID0gdV9taWxsaXMgKiAwLjAwMSAqIHVfZW5lcmd5O1xuICAgICAgICBcbiAgICAgICAgZmxvYXQgYSA9IDAuMDtcbiAgICAgICAgZmxvYXQgYiA9IDAuMDtcbiAgICAgICAgZmxvYXQgYyA9IDAuMDtcblxuICAgICAgICB2ZWMyIHBvcywgY2VudGVyID0gdmVjMiggMC41LCAwLjUgKiAodV9yZXNvbHV0aW9uLnkgLyB1X3Jlc29sdXRpb24ueCkgKTtcbiAgICAgICAgXG4gICAgICAgIGZsb2F0IG5hLCBuYiwgbmMsIG5kLCBkO1xuICAgICAgICBmbG9hdCBsaW1pdCA9IHVfcGFydGljbGVzIC8gNDAuMDtcbiAgICAgICAgZmxvYXQgc3RlcCA9IDEuMCAvIHVfcGFydGljbGVzO1xuICAgICAgICBmbG9hdCBuID0gMC4wO1xuICAgICAgICBcbiAgICAgICAgZm9yICggZmxvYXQgaSA9IDAuMDsgaSA8PSAxLjA7IGkgKz0gMC4wMjUgKSB7XG5cbiAgICAgICAgICAgIGlmICggaSA8PSBsaW1pdCApIHtcblxuICAgICAgICAgICAgICAgIHZlYzIgbnAgPSB2ZWMyKG4sIDEtMSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbmEgPSBub2lzZSggbnAgKiAxLjEgKTtcbiAgICAgICAgICAgICAgICBuYiA9IG5vaXNlKCBucCAqIDIuOCApO1xuICAgICAgICAgICAgICAgIG5jID0gbm9pc2UoIG5wICogMC43ICk7XG4gICAgICAgICAgICAgICAgbmQgPSBub2lzZSggbnAgKiAzLjIgKTtcblxuICAgICAgICAgICAgICAgIHBvcyA9IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwb3MueCArPSBzaW4odCpuYSkgKiBjb3ModCpuYikgKiB0YW4odCpuYSowLjE1KSAqIDAuMztcbiAgICAgICAgICAgICAgICBwb3MueSArPSB0YW4odCpuYykgKiBzaW4odCpuZCkgKiAwLjE7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZCA9IHBvdyggMS42Km5hIC8gbGVuZ3RoKCBwb3MgLSBwb3NpdGlvbiApLCB1X2Jsb2JpbmVzcyApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICggaSA8IGxpbWl0ICogMC4zMzMzICkgYSArPSBkO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBpIDwgbGltaXQgKiAwLjY2NjYgKSBiICs9IGQ7XG4gICAgICAgICAgICAgICAgZWxzZSBjICs9IGQ7XG5cbiAgICAgICAgICAgICAgICBuICs9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZlYzMgY29sID0gdmVjMyhhKmMsYipjLGEqYikgKiAwLjAwMDEgKiB1X2JyaWdodG5lc3M7XG4gICAgICAgIFxuICAgICAgICBpZiAoIHVfc2NhbmxpbmVzICkge1xuICAgICAgICAgICAgY29sIC09IG1vZCggZ2xfRnJhZ0Nvb3JkLnksIDIuMCApIDwgMS4wID8gMC41IDogMC4wO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIDEuMCApO1xuXG4gICAgfVxuXG4gICAgXCJcIlwiXG5cbnRyeVxuICAgIFxuICAgIGdsID0gU2tldGNoLmNyZWF0ZVxuXG4gICAgICAgICMgU2tldGNoIHNldHRpbmdzXG5cbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGFpbmVyJ1xuICAgICAgICB0eXBlOiBTa2V0Y2guV0VCX0dMXG5cbiAgICAgICAgIyBVbmlmb3Jtc1xuXG4gICAgICAgIGJyaWdodG5lc3M6IDAuOFxuICAgICAgICBibG9iaW5lc3M6IDEuNVxuICAgICAgICBwYXJ0aWNsZXM6IDQwXG4gICAgICAgIGVuZXJneTogMS4wMVxuICAgICAgICBzY2FubGluZXM6IHllc1xuXG5jYXRjaCBlcnJvclxuXG4gICAgbm9nbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdub2dsJ1xuICAgIG5vZ2wuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcblxuaWYgZ2xcblxuICAgIGdsLnNldHVwID0gLT5cblxuICAgICAgICB0aGlzLmNsZWFyQ29sb3IgMC4wLCAwLjAsIDAuMCwgMS4wXG5cbiAgICAgICAgIyBTZXR1cCBzaGFkZXJzXG5cbiAgICAgICAgdmVydCA9IEBjcmVhdGVTaGFkZXIgQFZFUlRFWF9TSEFERVJcbiAgICAgICAgZnJhZyA9IEBjcmVhdGVTaGFkZXIgQEZSQUdNRU5UX1NIQURFUlxuXG4gICAgICAgIEBzaGFkZXJTb3VyY2UgdmVydCwgR0xTTC52ZXJ0XG4gICAgICAgIEBzaGFkZXJTb3VyY2UgZnJhZywgR0xTTC5mcmFnXG5cbiAgICAgICAgQGNvbXBpbGVTaGFkZXIgdmVydFxuICAgICAgICBAY29tcGlsZVNoYWRlciBmcmFnXG5cbiAgICAgICAgdGhyb3cgQGdldFNoYWRlckluZm9Mb2cgdmVydCBpZiBub3QgQGdldFNoYWRlclBhcmFtZXRlciB2ZXJ0LCBAQ09NUElMRV9TVEFUVVNcbiAgICAgICAgdGhyb3cgQGdldFNoYWRlckluZm9Mb2cgZnJhZyBpZiBub3QgQGdldFNoYWRlclBhcmFtZXRlciBmcmFnLCBAQ09NUElMRV9TVEFUVVNcblxuICAgICAgICBAc2hhZGVyUHJvZ3JhbSA9IGRvIEBjcmVhdGVQcm9ncmFtXG4gICAgICAgIEAuYXR0YWNoU2hhZGVyIEBzaGFkZXJQcm9ncmFtLCB2ZXJ0XG4gICAgICAgIEAuYXR0YWNoU2hhZGVyIEBzaGFkZXJQcm9ncmFtLCBmcmFnXG4gICAgICAgIEBsaW5rUHJvZ3JhbSBAc2hhZGVyUHJvZ3JhbVxuXG4gICAgICAgIHRocm93ICdGYWlsZWQgdG8gaW5pdGlhbGlzZSBzaGFkZXJzJyBpZiBub3QgQGdldFByb2dyYW1QYXJhbWV0ZXIgQHNoYWRlclByb2dyYW0sIEBMSU5LX1NUQVRVU1xuXG4gICAgICAgIEB1c2VQcm9ncmFtIEBzaGFkZXJQcm9ncmFtXG5cbiAgICAgICAgIyBTdG9yZSBhdHRyaWJ1dGUgLyB1bmlmb3JtIGxvY2F0aW9uc1xuXG4gICAgICAgIEBzaGFkZXJQcm9ncmFtLmF0dHJpYnV0ZXMgPVxuICAgICAgICAgICAgcG9zaXRpb246IEBnZXRBdHRyaWJMb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ2FfcG9zaXRpb24nXG5cbiAgICAgICAgQHNoYWRlclByb2dyYW0udW5pZm9ybXMgPVxuICAgICAgICAgICAgcmVzb2x1dGlvbjogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfcmVzb2x1dGlvbidcbiAgICAgICAgICAgIGJyaWdodG5lc3M6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2JyaWdodG5lc3MnXG4gICAgICAgICAgICBibG9iaW5lc3M6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2Jsb2JpbmVzcydcbiAgICAgICAgICAgIHBhcnRpY2xlczogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfcGFydGljbGVzJ1xuICAgICAgICAgICAgc2NhbmxpbmVzOiBAZ2V0VW5pZm9ybUxvY2F0aW9uIEBzaGFkZXJQcm9ncmFtLCAndV9zY2FubGluZXMnXG4gICAgICAgICAgICBlbmVyZ3k6IEBnZXRVbmlmb3JtTG9jYXRpb24gQHNoYWRlclByb2dyYW0sICd1X2VuZXJneSdcbiAgICAgICAgICAgIG1pbGxpczogQGdldFVuaWZvcm1Mb2NhdGlvbiBAc2hhZGVyUHJvZ3JhbSwgJ3VfbWlsbGlzJ1xuXG4gICAgICAgICMgQ3JlYXRlIGdlb21ldHJ5XG5cbiAgICAgICAgQGdlb21ldHJ5ID0gZG8gQGNyZWF0ZUJ1ZmZlclxuICAgICAgICBAZ2VvbWV0cnkudmVydGV4Q291bnQgPSA2XG5cbiAgICAgICAgQGJpbmRCdWZmZXIgQEFSUkFZX0JVRkZFUiwgQGdlb21ldHJ5XG4gICAgICAgIEBidWZmZXJEYXRhIEBBUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgLTEuMCwgLTEuMCwgXG4gICAgICAgICAgICAgMS4wLCAtMS4wLCBcbiAgICAgICAgICAgIC0xLjAsICAxLjAsIFxuICAgICAgICAgICAgLTEuMCwgIDEuMCwgXG4gICAgICAgICAgICAgMS4wLCAtMS4wLCBcbiAgICAgICAgICAgICAxLjAsICAxLjBdKSxcbiAgICAgICAgICAgICBAU1RBVElDX0RSQVdcblxuICAgICAgICBAZW5hYmxlVmVydGV4QXR0cmliQXJyYXkgQHNoYWRlclByb2dyYW0uYXR0cmlidXRlcy5wb3NpdGlvblxuICAgICAgICBAdmVydGV4QXR0cmliUG9pbnRlciBAc2hhZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBvc2l0aW9uLCAyLCBARkxPQVQsIG5vLCAwLCAwXG5cbiAgICAgICAgIyBSZXNpemUgdG8gd2luZG93XG4gICAgICAgIGRvIEByZXNpemVcblxuICAgIGdsLnVwZGF0ZVVuaWZvcm1zID0gLT5cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNoYWRlclByb2dyYW1cblxuICAgICAgICBAdW5pZm9ybTJmIEBzaGFkZXJQcm9ncmFtLnVuaWZvcm1zLnJlc29sdXRpb24sIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBAdW5pZm9ybTFmIEBzaGFkZXJQcm9ncmFtLnVuaWZvcm1zLmJyaWdodG5lc3MsIEBicmlnaHRuZXNzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuYmxvYmluZXNzLCBAYmxvYmluZXNzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMucGFydGljbGVzLCBAcGFydGljbGVzXG4gICAgICAgIEB1bmlmb3JtMWkgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuc2NhbmxpbmVzLCBAc2NhbmxpbmVzXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMuZW5lcmd5LCBAZW5lcmd5XG5cbiAgICBnbC5kcmF3ID0gLT5cblxuICAgICAgICAjIFVwZGF0ZSB1bmlmb3Jtc1xuXG4gICAgICAgIEB1bmlmb3JtMWYgQHNoYWRlclByb2dyYW0udW5pZm9ybXMubWlsbGlzLCBAbWlsbGlzICsgNTAwMFxuXG4gICAgICAgICMgUmVuZGVyXG5cbiAgICAgICAgQGNsZWFyIEBDT0xPUl9CVUZGRVJfQklUIHwgQERFUFRIX0JVRkZFUl9CSVRcbiAgICAgICAgQGJpbmRCdWZmZXIgQEFSUkFZX0JVRkZFUiwgQGdlb21ldHJ5XG4gICAgICAgIEBkcmF3QXJyYXlzIEBUUklBTkdMRVMsIDAsIEBnZW9tZXRyeS52ZXJ0ZXhDb3VudFxuXG4gICAgZ2wucmVzaXplID0gLT5cblxuICAgICAgICAjIFVwZGF0ZSByZXNvbHV0aW9uXG5cbiAgICAgICAgQHZpZXdwb3J0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgICAgICMgVXBkYXRlIHVuaWZvcm1zIGlmIHRoZSBzaGFkZXIgcHJvZ3JhbSBpcyByZWFkeVxuXG4gICAgICAgIGRvIEB1cGRhdGVVbmlmb3Jtc1xuXG4gICAgIyBHVUlcbiAgICBndWkgPSBuZXcgZGF0LkdVSSgpXG4gICAgZ3VpLmFkZCggZ2wsICdwYXJ0aWNsZXMnICkuc3RlcCggMS4wICkubWluKCA4ICkubWF4KCA0MCApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmFkZCggZ2wsICdicmlnaHRuZXNzJyApLnN0ZXAoIDAuMDEgKS5taW4oIDAuMSApLm1heCggMS4wICkub25DaGFuZ2UgLT4gZG8gZ2wudXBkYXRlVW5pZm9ybXNcbiAgICBndWkuYWRkKCBnbCwgJ2Jsb2JpbmVzcycgKS5zdGVwKCAwLjAxICkubWluKCAwLjggKS5tYXgoIDEuNSApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmFkZCggZ2wsICdlbmVyZ3knICkuc3RlcCggMC4wMSApLm1pbiggMC4xICkubWF4KCA0LjAgKS5vbkNoYW5nZSAtPiBkbyBnbC51cGRhdGVVbmlmb3Jtc1xuICAgIGd1aS5hZGQoIGdsLCAnc2NhbmxpbmVzJyApLm9uQ2hhbmdlIC0+IGRvIGdsLnVwZGF0ZVVuaWZvcm1zXG4gICAgZ3VpLmNsb3NlKClcbiJdfQ==
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
//# sourceURL=coffeescript