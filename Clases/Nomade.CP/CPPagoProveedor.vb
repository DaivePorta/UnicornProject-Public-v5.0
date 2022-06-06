Public Class CPPagoProveedor

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function PagarProveedorCaja(ByVal p_detalle As String, ByVal p_caja_code As String,
                               ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                                 ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                               ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String, ByVal p_tipo_cambio As String,
                               ByVal p_ver_imagen As String,
                               Optional ByVal p_ind As String = "CAJ", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                                Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                                 Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "") As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_PROVEEDOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function PagarProveedorBanco(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String, Optional ByVal p_adicional As String = "",
                               Optional ByVal p_caja_code As String = "", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_PROVEEDOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PagarGastosVariosAProveedorCaja(ByVal p_detalle As String, ByVal p_caja_code As String,
                               ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                                 ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                               ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String, ByVal p_tipo_cambio As String,
                               ByVal p_ver_imagen As String,
                               Optional ByVal p_ind As String = "CAJ", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                                Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                                 Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "") As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGOS_VARIOS_PROVEE_GASTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PagarGastosVariosAProveedorBanco(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String, Optional ByVal p_adicional As String = "",
                               Optional ByVal p_caja_code As String = "", Optional ByVal p_NOTACREDITO As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGOS_VARIOS_PROVEE_GASTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function PagarProveedorNotaCredito(ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                             ByVal p_NOTACREDITO As String, ByVal p_tipo_cambio As String, ByVal p_ver_imagen As String) As Array
        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_PROVEEDOR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", "0", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOTACREDITO", p_NOTACREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VER_IMAGEN", p_ver_imagen, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd.Parameters("@p_MENSAJE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarProveedoresPorPagar(ByVal empresa As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_PROVEEDORES_POR_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", empresa, ParameterDirection.Input, 253))

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

    Public Function ListarProveedoresPorPagarGatos(ByVal empresa As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_PROVEEDORES_POR_PAGAR_GASTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", empresa, ParameterDirection.Input, 253))

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

    Public Function ListarProveedoresGatos(ByVal empresa As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_PROVEEDORES_GASTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", empresa, ParameterDirection.Input, 253))

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
    Public Function ListarPagosProveedores(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_PROV_PIDM As String, ByVal p_DESDE As String, ByVal p_HASTA As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_PAGOS_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarPagosVariosGastosProveedores(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_PROV_PIDM As String, ByVal p_DESDE As String, ByVal p_HASTA As String)

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_PAGOS_VARIOS_GASTOS_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

