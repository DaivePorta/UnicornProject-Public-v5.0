Imports System.Data

Partial Class vistas_NM_NMLEQUN
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NM.NMEquivalenciaUnidades("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarEquivalenciaUnMe(String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""UNIDAD_MEDIDA"":{""CODIGO"":""" & row("CODIGO").ToString & """,""NOMBRE"":""" & row("UNIDAD_MEDIDA").ToString & """},")
                    sb.Append("""UNIDAD_MEDIDA_EQ"":{""CODIGO"":""" & row("CODIGO_EQUI").ToString & """,""NOMBRE"":""" & row("UNIDAD_MEDIDA_EQ").ToString & """},")
                    sb.Append("""EQUIVALENCIA"":""" & row("EQUIVALENCIA").ToString & """")
                    
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
