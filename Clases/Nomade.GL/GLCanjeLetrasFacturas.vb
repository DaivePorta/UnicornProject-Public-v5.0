Public Class GLCanjeLetrasFacturas
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarCanje(ByVal p_tipo As String, ByVal p_codigo As String, Optional ByVal p_maestra As String = "N", Optional ByVal p_CTLG As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_CANJE_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MAESTRA", p_maestra, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarLetrasAsociadas(ByVal p_CODE_VENTA As String, ByVal p_CTLG As String, ByVal p_TIPO_LETRA As String, ByVal p_DOCUMENTO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LETRAS_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VENTA", p_CODE_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_LETRA", p_TIPO_LETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_DOCUMENTO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function CrearCanje(ByVal p_TIPO As String,
                               ByVal p_USUARIO As String,
                               ByVal p_CTLG As String,
                               ByVal p_PIDM As String,
                               ByVal p_MONTO As String,
                               ByVal p_MONEDA As String,
                               ByVal p_SCSL As String,
                               ByVal p_montoCambio As String,
                               ByVal p_fechaCanje As String,
                               Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_CREAR_CANJE_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL", p_SCSL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTOCAMBIO", p_montoCambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAGENTE", p_fechaCanje, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            msg = cmd.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function TraerMontoCambio(ByVal p_CODIGO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_TRAER_MONTO_CAMBIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_CAMBIO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MONTO_CAMBIO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCanjeDetLetra(ByVal p_CODE_CANJE As String, ByVal p_CODE_LETRA As String,
                                       Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_CREAR_CANJE_DET_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CANJE", p_CODE_CANJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_LETRA", p_CODE_LETRA, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return "OK"

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCanjeDetDocumneto(ByVal p_CODE_CANJE As String, ByVal p_CODE_DOC As String, ByVal p_MONTO As String,
                                       Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_CREAR_CANJE_DET_DOCUMENTO_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CANJE", p_CODE_CANJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DOC", p_CODE_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return "OK"

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function EliminarCanje(ByVal p_codigo As String, ByVal p_item As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFL_ELIMINAR_CANJE_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_item, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"



            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarFacturas(ByVal p_codigo As String, ByVal p_ctlg As String, ByVal p_tipo As String, ByVal p_estado As String, ByVal p_scsl As String, Optional ByVal p_canje As String = "", Optional p_moneda As String = "", Optional p_pidm As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_FACTURAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANJE", p_canje, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_PR_CL", p_pidm, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGetCodCanjeXDocVta(ByVal p_CODE_VENTA As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_COD_CANJE_LETRA_X_DOC_VTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_VENTA", p_CODE_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CANJE", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim sCodigo As String = (cmd.Parameters("@p_CODE_CANJE").Value).ToString()

            Return sCodigo

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCanjeLetra(p_CODE_CANJE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_LISTAR_CANJE_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CANJE", p_CODE_CANJE, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCanjea(p_TIPO As String, p_CTLG As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim oDT As New DataTable()

            cmd = cn.GetNewCommand("PFL_GET_LISTAR_CANJES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))

            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarLetrasCanje(ByVal p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_CANJE_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarFacturasCanje(ByVal p_ctlg As String, ByVal p_tipo As String, ByVal p_pidm As String, ByVal p_scsl As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_FACTURAS_CANJE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarDocumentoCanje(ByVal p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_CANJE_DOCUMENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
