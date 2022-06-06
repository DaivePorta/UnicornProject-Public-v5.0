
Partial Class vistas_NN_NNPLANI
    Inherits Nomade.N.Cub





    Protected Sub btn_xls_Click(sender As Object, e As EventArgs) Handles btn_xls.Click
        

        Dim nombreArch As String = "Planilla" + hddAnio.Value + hddMes.Value

        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.AddHeader("Content-type", "")
        HttpContext.Current.Response.AddHeader("Charset", "application/vnd.ms-excel")
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" & nombreArch & ".xls")
        HttpContext.Current.Response.ContentType = "Content-type: application/vnd.ms-excel"
        HttpContext.Current.Response.ContentEncoding = Encoding.Default
        HttpContext.Current.Response.Charset = "UTF-8"
        HttpContext.Current.Response.Write(Me.hddTabla.Value)
        HttpContext.Current.Response.End()
        HttpContext.Current.Response.Flush()
    End Sub
End Class
