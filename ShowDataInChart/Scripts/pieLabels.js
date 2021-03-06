﻿    
/**
 * [Chart.PieceLabel.js]{@link https://github.com/emn178/Chart.PieceLabel.js}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2017
 * @license MIT
 */
(function () {
    function p() { this.drawDataset = this.drawDataset.bind(this) } p.prototype.beforeDatasetsUpdate = function (a) { if (this.parseOptions(a) && "outside" === this.position) { var b = 1.5 * this.fontSize + 2; a.chartArea.top += b; a.chartArea.bottom -= b } }; p.prototype.afterDatasetsDraw = function (a) { this.parseOptions(a) && (this.labelBounds = [], a.config.data.datasets.forEach(this.drawDataset)) }; p.prototype.drawDataset = function (a) {
        for (var b = this.ctx, g = this.chartInstance, h = a._meta[Object.keys(a._meta)[0]], k = 0, l = 0; l < h.data.length; l++) {
            var e =
            h.data[l], d = e._view; if (0 !== d.circumference || this.showZero) {
                switch (this.mode) { case "value": var c = a.data[l]; this.format && (c = this.format(c)); c = c.toString(); break; case "label": c = g.config.data.labels[l]; break; default: c = d.circumference / this.options.circumference * 100, c = parseFloat(c.toFixed(this.precision)), k += c, 100 < k && (c -= k - 100, c = parseFloat(c.toFixed(this.precision))), c += "%" } b.save(); b.beginPath(); b.font = Chart.helpers.fontString(this.fontSize, this.fontStyle, this.fontFamily); if ("outside" === this.position ||
                "border" === this.position && "pie" === g.config.type) { var f = d.outerRadius / 2; var m, q = this.fontSize + 2; var n = d.startAngle + (d.endAngle - d.startAngle) / 2; "border" === this.position ? m = (d.outerRadius - f) / 2 + f : "outside" === this.position && (m = d.outerRadius - f + f + q); n = { x: d.x + Math.cos(n) * m, y: d.y + Math.sin(n) * m }; if ("outside" === this.position) { n.x = n.x < d.x ? n.x - q : n.x + q; var p = d.outerRadius + q } } else f = d.innerRadius, n = e.tooltipPosition(); if (this.arc) p || (p = (f + d.outerRadius) / 2), b.fillStyle = this.fontColor, b.textBaseline = "middle", this.drawArcText(c,
                p, d); else { f = b.measureText(c); d = n.x - f.width / 2; f = n.x + f.width / 2; q = n.y - this.fontSize / 2; var r = n.y + this.fontSize / 2; if ("outside" === this.position ? this.checkTextBound(d, f, q, r) : e.inRange(d, q) && e.inRange(d, r) && e.inRange(f, q) && e.inRange(f, r)) b.fillStyle = this.fontColor, b.textBaseline = "top", b.textAlign = "center", b.fillText(c, n.x, n.y - this.fontSize / 2) } b.restore()
            }
        }
    }; p.prototype.parseOptions = function (a) {
        var b = a.options.pieceLabel; return b ? (this.chartInstance = a, this.ctx = a.chart.ctx, this.options = a.config.options, this.mode =
        b.mode, this.position = b.position || "default", this.arc = b.arc || !1, this.format = b.format, this.precision = b.precision || 0, this.fontSize = b.fontSize || this.options.defaultFontSize, this.fontColor = b.fontColor || "#fff", this.fontStyle = b.fontStyle || this.options.defaultFontStyle, this.fontFamily = b.fontFamily || this.options.defaultFontFamily, this.hasTooltip = a.tooltip._active && a.tooltip._active.length, this.showZero = b.showZero || !1, !0) : !1
    }; p.prototype.checkTextBound = function (a, b, g, h) {
        for (var k, l, e = this.labelBounds, d = 0; d <
        e.length; ++d) { for (var c = e[d], f = [[a, g], [a, h], [b, g], [b, h]], m = 0; m < f.length; ++m) if (l = f[m][0], k = f[m][1], l >= c.left && l <= c.right && k >= c.top && k <= c.bottom) return !1; f = [[c.left, c.top], [c.left, c.bottom], [c.right, c.top], [c.right, c.bottom]]; for (m = 0; m < f.length; ++m) if (l = f[m][0], k = f[m][1], l >= a && l <= b && k >= g && k <= h) return !1 } e.push({ left: a, right: b, top: g, bottom: h }); return !0
    }; p.prototype.drawArcText = function (a, b, g) {
        var h = this.ctx, k = g.x, l = g.y, e = g.startAngle; g = g.endAngle; h.save(); h.translate(k, l); l = g - e; e += Math.PI / 2; g += Math.PI /
        2; k = h.measureText(a); e += (g - (k.width / b + e)) / 2; if (!(g - e > l)) for (h.rotate(e), e = 0; e < a.length; e++) g = a.charAt(e), k = h.measureText(g), h.save(), h.translate(0, -1 * b), h.fillText(g, 0, 0), h.restore(), h.rotate(k.width / b); h.restore()
    }; Chart.pluginService.register({ beforeInit: function (a) { a.pieceLabel = new p }, beforeDatasetsUpdate: function (a) { a.pieceLabel.beforeDatasetsUpdate(a) }, afterDatasetsDraw: function (a) { a.pieceLabel.afterDatasetsDraw(a) } })
})();