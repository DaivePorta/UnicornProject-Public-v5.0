Imports System.Data

Partial Class vistas_NS_NSLACCE
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            If Not Page.IsPostBack Then
                Me.txtfinicio.Text = Date.Now.Date
                Me.txtffin.Text = Date.Now.Date
            End If
            
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Try
            Dim P As New Nomade.NS.NScusuario("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = P.ListarAccesoUsuario(Me.txtempleado.Text, Utilities.fechaLocal(Me.txtfinicio.Text), Utilities.fechaLocal(Me.txtffin.Text))
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                    sb.Append("""IP"":""" & row("IP").ToString & """,")
                    sb.Append("""NAVEGADOR"":""" & row("NAVEGADOR").ToString & """,")
                    sb.Append("""FECHA"":""" & row("FECHA").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("-")
                sb.Replace("},-", "}")
                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class
